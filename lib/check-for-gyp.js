'use strict';

let gunzip = require('gunzip-maybe');
let tar = require('tar');
let got = require('got');
let parsePackageJson = require('./parse-package-json');

module.exports = function checkForGypFile(doc, version) {
  version = version || (doc['dist-tags'] && doc['dist-tags'].latest);
  let url = parsePackageJson(doc);
  let response = got.stream(url);
  let unzip = gunzip();
  let untar = tar.Parse();

  let clientResponse;
  response.on('response', res => clientResponse = res);

  return new Promise((accept, reject) => {
    let detected = false;

    let finish = () => {
      response.end();

      // this seriously doesn't always exist
      if (clientResponse && clientResponse.destroy) {
        clientResponse.destroy();
      }

      if (!detected) {
        reject(new Error('No binding.gyp detected for ' + doc.name + '@' + version));
      } else {
        accept(doc);
      }
    };

    response.on('error', finish);
    unzip.on('error', finish);
    untar.on('error', finish).on('end', finish);

    untar.on('entry', (entry) => {
      entry.abort();
      let file = entry.props.path;
      if (file.match(/binding\.gyp$/)) {
        detected = true;
        finish();
      }
    });

    response.pipe(unzip).pipe(untar);
  });
};

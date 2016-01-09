'use strict';

let gunzip = require('gunzip-maybe');
let tar = require('tar');
let got = require('got');

module.exports = function checkForGypFile(doc) {
  let name = doc.name;
  let version = doc['dist-tags'] && doc['dist-tags'].latest;
  let info = doc.versions && doc.versions[version];

  if (!info) {
    return Promise.reject(new Error('no metadata for ' + name + '@' + version));
  }

  if (!info.dist || !info.dist.tarball) {
    return Promise.reject(new Error('No tarball url for ' + name + '@' + version));
  }

  let url = info.dist.tarball;

  let response = got.stream(url);
  let clientResponse;
  response.on('response', res => clientResponse = res);

  let unzip = gunzip();
  let parser = tar.Parse();

  return new Promise((accept, reject) => {
    let detected = false;
    let finished = () => {
      response.end();

      if (clientResponse && clientResponse.destroy) {
        clientResponse.destroy();
      }

      if (!detected) {
        reject(new Error('No binding.gyp detected for ' + name + '@' + version));
      } else {
        accept(doc);
      }
    };

    response.on('error', reject);
    unzip.on('error', finished);
    parser.on('end', finished).on('error', finished);

    parser.on('entry', (entry) => {
      let file = entry.props.path;
      if (file.match(/binding\.gyp$/)) {
        detected = true;
        finished();
      }
      entry.abort();
    });

    response.pipe(unzip).pipe(parser);
  });
};

'use strict';

let got = require('got');
let parsePackageJson = require('./parse-package-json');

function lookupPackageUrl(identifier) {
  let ident = identifier.split('@');
  let name = ident[0];
  let version = ident[1];
  return got('https://skimdb.npmjs.com/registry/' + name, {
    json: true
  }).then(request => parsePackageJson(request.body, version));
}

module.exports = lookupPackageUrl;

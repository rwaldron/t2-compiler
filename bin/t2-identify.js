#!/usr/bin/env node

'use strict';

let got = require('got');
let checkForGypFile = require('../lib/check-for-gyp');

function logPackageInfo(doc) {
  let name = doc.name;
  let version = doc['dist-tags'] && doc['dist-tags'].latest;
  console.log('binding.gyp detected', name + '@' + version);
}

function logReject(error) {
  console.error(error.message);
}

function getPackage(name) {
  console.error('Processing ' + name);
  return got('https://skimdb.npmjs.com/registry/' + name, {
      json: true
    })
    .then(request => request.body);
}

function checkPackage(name) {
  return getPackage(name).then(checkForGypFile).then(logPackageInfo, logReject);
}

checkPackage(process.argv[2]);

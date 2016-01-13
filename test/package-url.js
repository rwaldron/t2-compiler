'use strict';

let serialportJSON = require('./fixtures/serialport.json');
let proxyquire = require('proxyquire');

let packageUrl = proxyquire('../lib/package-url', {
  got: () => {
    return Promise.resolve({
      body: serialportJSON
    });
  }
});

let packageUrlFail = proxyquire('../lib/package-url', {
  got: () => {
    return Promise.reject(new Error('404'));
  }
});

module.exports = {
  setUp: function(callback) {
    callback();
  },
  tearDown: function(callback) {
    callback();
  },
  packageUrlLatest: function(test) {
    test.expect(1);
    packageUrl('serialport').then(url => {
      test.equal(
        url,
        'http://registry.npmjs.org/serialport/-/serialport-2.0.6.tgz',
        'matches the url of the latest serialport tar'
      );
      test.done();
    });
  },
  packageUrlVersioned: function(test) {
    test.expect(1);
    packageUrl('serialport@1.6.3').then(url => {
      test.equal(
        url,
        'http://registry.npmjs.org/serialport/-/serialport-1.6.3.tgz',
        'matches the url of the right version of the serialport tar'
      );
      test.done();
    });
  },
  packageUrlBadVersion: function(test) {
    test.expect(1);
    packageUrl('serialport@1.900.3').catch(error => {
      test.equal(
        error.message,
        'Unable to find version for serialport@1.900.3',
        'reports issue with the version'
      );
      test.done();
    });
  },
  packageUrlBadPackage: function(test) {
    test.expect(1);
    packageUrlFail('bogus mcgee').catch(error => {
      test.ok(
        error,
        'errors when got errors'
      );
      test.done();
    });
  }
};

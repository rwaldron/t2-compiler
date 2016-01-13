'use strict';

function parsePackageJson(body, version) {
  let identifier = body.name + '@' + version;
  version = version || (body['dist-tags'] && body['dist-tags'].latest);
  if (!version || !body.versions) {
    throw new Error('Unable to parse json for ' + identifier);
  }

  let meta = body.versions[version];
  if (!meta) {
    throw new Error('Unable to find version for ' + identifier);
  }
  if (!meta.dist.tarball) {
    throw new Error('Unable to find url for ' + identifier);
  }
  return meta.dist.tarball;
}


module.exports = parsePackageJson;

'use strict';

var path = require('path');
var blacklist = require('metro-bundler/src/blacklist');

var config = {
  getProjectRoots() {
    return getRoots();
  },

  getBlacklistRE() {
    return blacklist([
    ]);
  },

  getAssetExts() {
    return ['obj', 'mtl'];
  },

  getPlatforms() {
    return ['vr'];
  },

  getProvidesModuleNodeModules() {
    return ['react-native', 'react-vr'];
  },
};

function getRoots() {
  var port = process.env.PORT || 8080;
  return port;
//   var root = process.env.REACT_NATIVE_APP_ROOT;
//   if (root) {
//     return [path.resolve(root)];
//   }
//   return [path.resolve(__dirname)];
}

module.exports = config;
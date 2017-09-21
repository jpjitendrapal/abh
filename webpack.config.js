var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './old/abhnews/src/js/index.js',
  output: { path: __dirname, filename: 'script.js' },
  module: {
    loaders: [
    ]
  },
};
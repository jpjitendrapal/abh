var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './website/abhnews/src/js/index.js',
  output: { path: __dirname, filename: 'script.js' },
  module: {
    loaders: [
    ]
  },
};
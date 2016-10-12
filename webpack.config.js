var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractCSS = new ExtractTextPlugin('bundle.css');
var precss       = require('precss');
var autoprefixer = require('autoprefixer');

module.exports = {
  entry: [
    './app.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'dist'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    extractCSS
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ['babel'],
    }, {
      test: /\.less/,
      loader: extractCSS.extract(
        'style', 'css!postcss?sourceMap=inline!less'
      )
    }, {
      test: /\.(png|jpg|ttf|woff|svg|otf|eot|svg).*?$/,
      loader: 'file-loader'
    }]
  },
  postcss: function () {
    return [precss, autoprefixer({ browsers: ['last 2 versions']})];
  }
};
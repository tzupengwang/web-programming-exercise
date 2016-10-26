const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './static/src/scripts/index',
  ],
  output: {
    path: path.join(__dirname, 'static/dist'),
    filename: 'bundle.js',
    publicPath: '/static/dist/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'static/src/scripts'),
    }, {
      test: /\.styl$/,
      loaders: ['style', 'css', 'stylus?paths=node_modules/bootstrap-stylus/stylus/'],
    }],
  },
};

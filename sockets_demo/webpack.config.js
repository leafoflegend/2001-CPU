const path = require('path');

module.exports = {
  entry: path.join(__dirname, './client/index.js'),
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'main.js',
  },
  devtool: 'source-map',
  mode: 'development',
  module: {
    rules: [
      {
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
};

const { merge } = require('webpack-merge');
const path = require('path');
const common = require('./webpack.config.js');

const distPath = path.resolve(__dirname, '..', 'dist');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    historyApiFallback: true,
    hot: true,
    compress: false,
    port: 3000,
  },
});

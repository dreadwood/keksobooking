const path = require('path');

module.exports = {
  entry: './src/js/main.js',
  output: {
    filename: 'js/main.bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    watchContentBase: true,
  },
};

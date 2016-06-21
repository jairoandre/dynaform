var webpack = require('webpack');

module.exports = {

  entry: {
    'dynaform': './src/app/dynaform.js',
    'dynaform.min': './src/app/dynaform.js'},
  output: {
    path: './dist',
    filename: '[name].js'
  },
  externals: {
    'jquery': 'jQuery'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true
    })
  ]
};

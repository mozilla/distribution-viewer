import path from 'path';
import webpack from 'webpack';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'TRACKING_ID': JSON.stringify(process.env.TRACKING_ID),
    }
  })
];

// Debugging is a bit tricker when the bundle is compressed, so only compress it
// on production.
if (process.env.NODE_ENV === 'production') {
  plugins.push(new UglifyJsPlugin());
}

module.exports = {
  entry: './viewer/core/static/js/app/app.js',
  output: {
    filename: './viewer/core/static/js/bundle.js',
    sourceMapFilename: './viewer/core/static/js/bundle.map'
  },
  devtool: '#source-map',
  plugins,
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
};

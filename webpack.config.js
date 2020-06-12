const path = require('path');
const LoadablePlugin = require('@loadable/webpack-plugin');

const outputDirectory = 'dist';

module.exports = {
  // entry: ['babel-polyfill', './src/client/index.js'],
  context: path.join(__dirname, 'src'),
  devtool: process.env.NODE_ENV === 'production' ? 'none' : 'source-map',
  entry: {
    client: './client/index.js',
  },
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: '[name].bundle.js'
    // filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    },
    {
      test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      loader: 'url-loader?limit=100000'
    }]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    modules: [
      path.resolve('./src'),
      'node_modules',
    ],
  },
  plugins: [new LoadablePlugin()],
};

const path = require('path');
const LoadablePlugin = require('@loadable/webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpack = require('webpack');

const outputDirectory = 'dist';

module.exports = (env) => {
  const plugins = [
    new LoadablePlugin(),
    new webpack.DefinePlugin({
      FB_CLIENT: JSON.stringify(env.FB_CLIENT),
    }),
  ];
  if (process.env.NODE_ENV === 'development') {
    plugins.push(new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'webpack-report.html',
      openAnalyzer: false,
    }));
  }

  return {
    // entry: ['babel-polyfill', './src/client/index.js'],
    context: path.join(__dirname, 'src'),
    devtool: process.env.NODE_ENV === 'production' ? 'none' : 'source-map',
    entry: {
      client: './client/index.js',
    },
    output: {
      path: path.join(__dirname, 'src', 'server', outputDirectory),
      filename: '[name].bundle.js',
      publicPath: '/'
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
    plugins,
  };
};

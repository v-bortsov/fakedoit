const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const rootDir = path.join(
  __dirname,
  '..' 
);
const webpackEnv = process.env.NODE_ENV || 'development';
const isProdEnv = webpackEnv === 'production';
const isDevEnv = webpackEnv === 'development';

module.exports = {
  entry: [
    isDevEnv && 'webpack/hot/dev-server.js',
    isDevEnv && 'webpack-dev-server/client/index.js?hot=true&live-reload=true',
    path.join(
      rootDir,
      './packages/server/src/server.ts'
    )
  ].filter(Boolean),
  mode: webpackEnv,
  output: {
    filename: 'server-[chunkhash].bundle.js',
    path: path.resolve(
      rootDir,
      'dist'
    ),
    // clean: true,
  },
  devtool: 'source-map',
  target: 'node',
  devServer: {
    open: false,
    http2: true,
    https: {
      // minVersion: 'TLSv1.1',
      requestCert: false,
    },
    client: {
      overlay: false,
    },
    historyApiFallback: true,
    static: __dirname + '/../dist/',
    hot: true,
    liveReload: false,
    compress: false,
    port: 3010,
  },
  module: {
    rules: [
      isProdEnv && {
        test: /\.(ts|js)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          babelrc: false,
          configFile: false,
        },
      },
      isDevEnv && {
        test: /\.(js|ts)$/,
        loader: 'ts-loader',
        options: {
          // silent: false,
          babelrc: true,
          transpileOnly: true,
          configFile: __dirname + '/../packages/server/tsconfig.json',
          errorFormatter: function customErrorFormatter(
            error, colors
          ) {
            const messageColor =
              error.severity === 'warning' ? colors.bold.yellow : colors.bold.red;
            return (
              'Does not compute.... ' +
              messageColor(Object.keys(error)
                .map(key => `${key}: ${error[key]}`))
            );
          }
        },
      },
    ].filter(Boolean),
  },
  resolve: {
    extensions: [
      '.js',
      '.json',
      '.ts'
    ],
  },
  stats: {
    errorDetails: false,
    warnings: false
  },
  plugins: [
    new ESLintPlugin({ extensions: [
      'ts',
      'js'
    ] }),
    isProdEnv && new CompressionPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ].filter(Boolean),
}
const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const Dotenv = require('dotenv-webpack');
const NodemonPlugin = require('nodemon-webpack-plugin'); 

const rootDir = __dirname;
const ASSET_PATH = process.env.OLDPWD || '/';

const webpackEnv = process.env.NODE_ENV || 'development';
const isProdEnv = webpackEnv === 'production';
const isDevEnv = webpackEnv === 'development';
const { resolve } = require('path')

// const dotenv = require('dotenv').config( {
//   path: path.join(__dirname, 'production.env')
// } );

console.log(webpackEnv, resolve(__dirname, './production.env'))

module.exports = {
  entry: {
    // isDevEnv && 'webpack/hot/dev-server.js',
    // // 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    // isDevEnv && 'webpack-dev-server/client/index.js?hot=true&live-reload=false',
    // isDevEnv && 'webpack/hot/poll?1000',
    // () => ['./src/makeModels.ts',
    make: {
      import: path.join(
        rootDir,
        './src/makeModels.ts'
      ),
      filename: 'makeModels.js'
    },
    server: {
      import: path.join(
        rootDir,
        './src/server.ts'
      ),
      // dependOn: 'make',
      filename: 'server.bundle.js'
    }
  },
  mode: webpackEnv,
  output: {
    // filename: 'server.bundle.js',
    path: path.resolve(
      rootDir,
      'dist'
    ),
    clean: true,
  },
  devtool: 'eval',
  target: 'node',
  watch: isDevEnv,
  module: {
    rules: [
      // isProdEnv && {
      //   test: /\.(ts|js)$/,
      //   loader: 'babel-loader',
      //   exclude: /node_modules/,
      //   options: {
      //     babelrc: false,
      //     configFile: false,
      //   },
      // },
      {
        test: /\.m?js$/,
        include: /node_modules/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false
        }
      },
      {
        test: /\.(js|ts)$/,
        loader: 'ts-loader',
        resolve: {
          fullySpecified: false
        },
        options: {
          // silent: false,
          // babelrc: true,
          transpileOnly: true,
          configFile: __dirname + '/tsconfig.json',
          errorFormatter: function customErrorFormatter(
            error, colors
          ) {
            const messageColor = error.severity === 'warning' ? colors.bold.yellow : colors.bold.red;
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
      '.ts',
      '.mjs',
      '.js',
      '.wasm',
    ],
    alias: {
      'pg-native': 'noop2',
    }
  },
  externals: [nodeExternals({ allowlist: ['sequelize', 'pg-hstore', 'pg', 'graphql-relay'], modulesDir: './node_modules'})],
  externalsPresets: {
    node: true // in order to ignore built-in modules like path, fs, etc. 
  },
  // externals: { pg: { commonjs: 'pg' } },
  stats: {
    errorDetails: false,
    warnings: false
  },
  plugins: [
    isDevEnv && new ESLintPlugin({ extensions: [
      'ts',
      'js'
    ] }),
    // new webpack.EnvironmentPlugin({
    //   MODE: isProdEnv ? 'production' : 'development', // use 'development' unless process.env.NODE_ENV is defined
    //   DEBUG: false,
    // }),
    new Dotenv({
      path: resolve(__dirname, './production.env'),
      // safe: true,
    }),
    // new webpack.DefinePlugin({
    //   // process: {
    //   //   env: dotenv.parsed
    //   // }
    //   'process.env.MODE': JSON.stringify(isProdEnv ? 'production' : 'development'),
    //   'process.env.NODE_TLS_REJECT_UNAUTHORIZED': 0
    // }),
    isProdEnv && new CompressionPlugin(),
    isDevEnv && new NodemonPlugin(),
    // isDevEnv && new webpack.HotModuleReplacementPlugin(),
  ].filter(Boolean),
}
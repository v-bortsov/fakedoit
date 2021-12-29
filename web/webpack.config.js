const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const rootDir = path.join(
  __dirname,
  '..'
);
const webpackEnv = process.env.NODE_ENV || 'development';
const isProdEnv = webpackEnv === 'production';
const isDevEnv = webpackEnv === 'development';
const TerserPlugin = require('terser-webpack-plugin');
var Visualizer = require('webpack-visualizer-plugin2');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
module.exports = {
  entry: [
    isDevEnv && 'webpack/hot/dev-server.js', isDevEnv && 'webpack-dev-server/client/index.js?hot=true&live-reload=true', path.join(
      rootDir,
      './packages/client/index.web.ts'
    )
  ].filter(Boolean),
  mode: webpackEnv,
  optimization: {
    usedExports: isProdEnv,
    minimize: isProdEnv,
    sideEffects: isProdEnv,
    minimizer: [
      new TerserPlugin({
        parallel: 4,
        // Can be async
        minify: (
          input, sourceMap, minimizerOptions, extractsComments
        ) => {
          // The `minimizerOptions` option contains option from the `terserOptions` option
          // You can use `minimizerOptions.myCustomOption`
          const extractedComments = [];
          // Custom logic for extract comments
          const { map, code } = require('uglify-js') // Or require('./path/to/uglify-module')
            .minify(
              input,
              {
                mangle: {
                  toplevel: true,
                },
                nameCache: {},
              }
            );
          return { map, code, extractedComments };
        },
        terserOptions: {
          ecma: undefined,
          parse: {},
          compress: {},
          mangle: true, // Note `mangle.properties` is `false` by default.
          module: false,
        },
      }),
    ],
  },
  output: {
    filename: 'app-[chunkhash].bundle.js',
    path: path.resolve(
      rootDir,
      'dist'
    ),
    clean: true,
  },
  devtool: 'source-map',
  target: 'web',
  devServer: {
    // http2: true,
    // static: false,
    // contentBase: path.resolve("dist"),
    // publicPath: "/dist/",
    // inline: true,
    open: true,
    client: {
      overlay: false,
    },
    historyApiFallback: true,
    // proxy: {
    //   "/static": {
    //     target: "http://localhost:3333",
    //     pathRewrite: { "^/static": "/app/static" },
    //   },
    // },
    static: __dirname + '/../dist/',
    hot: true,
    liveReload: false,
    compress: false,
    port: 3000,
  },
  module: {
    rules: [
      // {
      //   test: /\.(js|jsx)$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: "babel-loader",
      //     // "side-effects": false,
      //     options: {
      //       presets: ["module:metro-react-native-babel-preset"],
      //       plugins: ["react-native-web"],
      //     },
      //   },
      // },
      isProdEnv && {
        test: /\.(tsx?|jsx?)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          babelrc: false,
          configFile: false,
          presets: ['module:metro-react-native-babel-preset'],
          plugins: ['react-native-web'],
        },
      }, isDevEnv && {
        test: /\.(tsx|jsx|js|ts)$/,
        loader: 'ts-loader',
        options: {
          // silent: false,
          transpileOnly: true,
          configFile: __dirname + '/../packages/client/tsconfig.json',
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
      }, {
        test: /\.(gif|jpe?g|png|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',
            esModule: false,
          },
        },
      },
    ].filter(Boolean),
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.tsx', '.ts'],
    alias: {
      'react-native$': 'react-native-web',
      'react-native-svg$': 'react-native-web-svg',
    },
  },
  stats: {
    errorDetails: false,
    warnings: false
  },
  plugins: [
    // new ForkTsCheckerWebpackPlugin({
    //   configFile: __dirname + '/../tsconfig.json'
    // }),
    new ESLintPlugin({ extensions: ['ts', 'tsx'] }), new HtmlWebpackPlugin({
      inject: true,
      template: path.join(
        __dirname,
        './index.html'
      ),
    }), isProdEnv && new CompressionPlugin(),

    // new Visualizer({
    //   filename: path.join("..", "stats", "statistics.html"),
    // }),
    isProdEnv && new BundleAnalyzerPlugin(), isProdEnv &&
      new CopyPlugin({
        patterns: [{ from: './mains.css', to: '../dist/mains.css' }],
      }), new webpack.HotModuleReplacementPlugin(),
  ].filter(Boolean),
};

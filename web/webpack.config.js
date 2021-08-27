const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const rootDir = path.join(__dirname, "..");
const webpackEnv = process.env.NODE_ENV || "production";
const TerserPlugin = require("terser-webpack-plugin");
var Visualizer = require("webpack-visualizer-plugin2");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
module.exports = {
  entry: [
    "webpack/hot/dev-server.js",
    "webpack-dev-server/client/index.js?hot=true&live-reload=true",
    path.join(rootDir, "./index.web.ts"),
  ],
  mode: webpackEnv,
  optimization: {
    usedExports: true,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: 4,
        // Can be async
        minify: (input, sourceMap, minimizerOptions, extractsComments) => {
          // The `minimizerOptions` option contains option from the `terserOptions` option
          // You can use `minimizerOptions.myCustomOption`
          const extractedComments = [];
          // Custom logic for extract comments
          const { map, code } = require("uglify-js") // Or require('./path/to/uglify-module')
            .minify(input, {
              mangle: {
                toplevel: true,
              },
              nameCache: {},
            });
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
    filename: "app-[chunkhash].bundle.js",
    path: path.resolve(rootDir, "dist"),
    clean: true,
  },
  devtool: "source-map",
  target: "web",
  devServer: {
    historyApiFallback: true,
    static: "./dist",
    hot: true,
    compress: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["module:metro-react-native-babel-preset"],
          plugins: ["react-native-web"],
        },
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
      },
      {
        test: /\.(gif|jpe?g|png|svg)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "[name].[ext]",
            esModule: false,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      "react-native$": "react-native-web",
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "./index.html"),
    }),
    new CompressionPlugin(),

    // new Visualizer({
    //   filename: path.join("..", "stats", "statistics.html"),
    // }),
    // new BundleAnalyzerPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};

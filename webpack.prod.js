const path = require("path");
const Webpack = require("webpack");
const merge = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const common = require("./webpack.common");

module.exports = merge(common, {

  output: {
    filename: "bundle.[hash].js",
    path: path.resolve(__dirname, "public"),
  },
  mode: "production",
devtool:"source-map",
  module: {
    rules: [

      {
        test: /\.css$/,
        use: [{ loader: MiniCssExtractPlugin.loader }, { loader: "css-loader" }],
      },
      {
        test: /\.scss$/,
        use: [{ loader: MiniCssExtractPlugin.loader }, { loader: "css-loader" }, { loader: "sass-loader" }],
      },

    ],


  }, // module
  plugins: [new CleanWebpackPlugin()],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          mangle: true,
          cache: false,
          compress: true,

        },
      }),
      new MiniCssExtractPlugin({ filename: "[name].[hash].css" }),

      new OptimizeCssAssetsPlugin(),
    ],
  },
});

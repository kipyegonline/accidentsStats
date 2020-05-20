const path = require("path");
const Webpack = require("webpack");
const merge = require("webpack-merge");


const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const common = require("./webpack.common");

module.exports = merge(common, {

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
  },
  mode: "development",
  devServer: {
    hot: true,
  },
  module: {
    rules: [

      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
      },
      {
        test: /\.scss$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }, { loader: "sass-loader" }],
      },

    ],


  }, // module
  plugins: [

    new Webpack.HotModuleReplacementPlugin(),

  ],

});

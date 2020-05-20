const Webpack = require("webpack");
const HmtlWebpackPlugin = require("html-webpack-plugin");
const MomentLocalesPlugin = require("moment-locales-webpack-plugin");

module.exports = {
  entry: "./src/js/App.js",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react", "babel-preset-airbnb"],
            },
          },

        ],
      },
      /*

            {
                test:/\.html$/,
                use:['html-loader']
            }, */
      {
        test: /\.(|jpeg|jpg|png|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "/images",
              publicPath: "./images",
            },
          }],
      },
      {
        test: /\.(csv|woff|woff2)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[hash].[ext]",
              outputPath: "googlefonts",
              publicPath: "./googlefonts",
            },
          },

        ],
      }, // file
    ],
  }, // module
  plugins: [

    new Webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      React: "react",
    }),
    new MomentLocalesPlugin(),
    new HmtlWebpackPlugin({ template: "./index.html", filename: "index.html" }),

  ],

};

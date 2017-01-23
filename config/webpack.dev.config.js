var path = require("path");
var webpack = require("webpack");
require("dotenv").config({silent:true});

var config = {
  debug: true,
  devtool: "eval-source-map",
  entry: {
    // babel-polyfill adds ES2015 support for IE
    main: ["babel-polyfill", "./src/index.js"]
  },
  output: {
    path: path.resolve(__dirname, "../build/"),
    filename: "[name].bundle.js"
  },
  plugins: [
    new webpack.EnvironmentPlugin([
      "SPARKPOST_SECRET"
    ])
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: "babel"
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
      {
        test: /\.css$/,
        loaders: ["style", "css"],
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        loader: "file?name=img/[name].[ext]"
      },
      {
        test: /\.(woff2?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file?name=fonts/[name].[ext]"
      }
    ]
  }
};

module.exports = config;

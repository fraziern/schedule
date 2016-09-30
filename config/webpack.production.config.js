// This is my simple webpack config
var path = require("path");
var webpack = require("webpack");

var config = {
  devtool: "cheap-module-source-map",
  entry: {
    main: "./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, "../build/"),
    filename: "[name].bundle.js"
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env":{
        "NODE_ENV": JSON.stringify("production")
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: true
      }
    })
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
        test: /\.(jpe?g|png|gif|svg)$/i,
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

// This is my simple webpack config
var path = require("path");
var webpack = require("webpack");

var config = {
  devtool: "source-map",
  entry: {
    // babel-polyfill adds ES2015 support for IE
    main: ["babel-polyfill", "./src/index.js"]
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
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: "file-loader?name=img/[name].[ext]"
      },
      {
        test: /\.(woff2?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader?name=fonts/[name].[ext]"
      }
    ]
  }
};

module.exports = config;

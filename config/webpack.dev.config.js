var path = require("path");

var config = {
  debug: true,
  entry: {
    main: ["babel-polyfill", "./src/index.js"]
  },
  output: {
    path: path.resolve(__dirname, "../build/"),
    filename: "[name].bundle.js"
  },
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

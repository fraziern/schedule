var config = {};

var mongoURIProd = process.env.MONGODB_URI;
var mongoURIDev = "mongodb://localhost/test";
var mongoURITest = "mongodb://localhost/test2";

config.mongoURI = {
  production: mongoURIProd,
  development: mongoURIDev,
  test: mongoURITest
};

module.exports = config;

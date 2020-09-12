var config = {};

var mongoURIProd = process.env.DB_URI;
var mongoURIDev = "mongodb://localhost/test";
var mongoURITest = "mongodb://localhost/test2";

config.mongoURI = {
  production: mongoURIProd,
  development: mongoURIDev,
  test: mongoURITest
};

module.exports = config;

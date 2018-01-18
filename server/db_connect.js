/*eslint no-console: ["error", { allow: ["log", "warn", "error"] }] */
var mongoose = require("mongoose");
// var seed = require("./seed");
var config = require("./_config");

module.exports = function() {
  var mongoUrl = config.mongoURI[process.env.NODE_ENV];
  console.log("NODE_ENV set to " + process.env.NODE_ENV);

  mongoose.connect(mongoUrl);
  var db = mongoose.connection;

  // CONNECTION EVENTS
  // When successfully connected
  db.on("connected", function() {
    console.log("Mongoose default connection open to " + mongoUrl);
    // seed(); // seed database with some test data if it is empty
  });

  // If the connection throws an error
  db.on("error", function(err) {
    console.log("Mongoose default connection error: " + err);
  });

  // When the connection is disconnected
  db.on("disconnected", function() {
    console.log("Mongoose default connection disconnected");
  });

  // If the Node process ends, close the Mongoose connection
  process.on("SIGINT", function() {
    db.close(function() {
      console.log(
        "Mongoose default connection disconnected through app termination"
      );
      process.exit(0);
    });
  });
};

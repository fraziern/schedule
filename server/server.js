/*eslint no-console: ["error", { allow: ["log", "warn", "error"] }] */
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// additional routes
var api = require("./routes/api.routes");

var app = express();

mongoose.connect("mongodb://localhost/test", function (err) {
  if (err) {
    console.log("Error connecting to the database. " + err);
  } else {
    console.log("Connected to Database: " + "mongodb://localhost/test");
  }
});

// seed database with some test data if it's empty
var seed = require("./seed");
seed();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", api);

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.listen(3001, function () {
  console.log("Example app listening on port 3001!");
});

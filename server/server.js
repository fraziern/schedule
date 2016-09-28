/*eslint no-console: ["error", { allow: ["log", "warn", "error"] }] */
var express = require("express");
var bodyParser = require("body-parser");
require("dotenv").config({silent:true});
var db_connect = require("./db_connect.js");
var morgan = require("morgan");

// additional routes
var api = require("./routes/api.routes");

var app = express();

db_connect();  // connect to Mongoose

//don"t show the log when it is test
if(process.env.NODE_ENV !== "test") {
  //use morgan to log at command line
  app.use(morgan("combined")); //"combined" outputs the Apache style LOGs
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/json"}));

app.use("/api", api);
app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.listen(3001, function () {
  console.log("Example app listening on port 3001!");
});

module.exports = app; // for testing

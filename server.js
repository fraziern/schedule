/*eslint no-console: ["error", { allow: ["log", "warn", "error"] }] */
var express = require("express");
var bodyParser = require("body-parser");
require("dotenv").config({silent:true});
var db_connect = require("./server/db_connect.js");
var morgan = require("morgan");

// additional routes
var api = require("./server/routes/api.routes");

var app = express();

db_connect();  // connect to Mongoose

//don"t show the log when it is test
if(process.env.NODE_ENV !== "test") {
  //use morgan to log at command line
  app.use(morgan("combined")); //"combined" outputs the Apache style LOGs
}

app.use(express.static("build"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/json"}));

app.use("/api", api);
app.get("*", function(req, res){
  console.log("Request: [GET]", req.originalUrl);
  res.sendFile(__dirname+"/index.html");
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Node.js listening on port " + port + "...");
});

module.exports = app; // for testing

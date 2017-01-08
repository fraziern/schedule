/*eslint no-console: ["error", { allow: ["log", "warn", "error"] }] */
var express = require("express");
var bodyParser = require("body-parser");
require("dotenv").config({silent:true});
var db_connect = require("./server/db_connect.js");
var morgan = require("morgan");
var cookieSession = require("cookie-session");

// Passport
// TODO: Move this to a separate module
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var verify = require("./server/controllers/auth.controller").verify;
var User = require("./server/models/User.js");

passport.use(new LocalStrategy(verify));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// additional routes
var api = require("./server/routes/api.routes");
var auth = require("./server/routes/auth.routes");

var app = express();

db_connect();  // connect to Mongoose

//don"t show the log when it is test
if(process.env.NODE_ENV !== "test") {
  //use morgan to log at command line
  app.use(morgan("combined")); //"combined" outputs the Apache style LOGs
}

app.use(express.static("build"));

// used for Passport
app.use(cookieSession({
  name: "session",
  keys: ["key1", "key2"]
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/json"}));

// Used for Passport
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", api);
app.use("/auth", auth);
app.get("*", function(req, res){
  console.log("Request: [GET]", req.originalUrl);
  res.sendFile(__dirname+"/index.html");
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Node.js listening on port " + port + "...");
});

module.exports = app; // for testing

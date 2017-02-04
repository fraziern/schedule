/*eslint no-console: ["error", { allow: ["log", "warn", "error"] }] */
var mongoose = require("mongoose");
mongoose.set("debug", true);
var Schema = mongoose.Schema;
var config = require("../server/_config");

var mongoUrl = config.mongoURI[process.env.NODE_ENV];

mongoose.connect(mongoUrl);
var db = mongoose.connection;
db.on("connected", function () {
  console.log("Mongoose default connection open to " + mongoUrl);
});
db.on("error", function (err) {
  console.log("An error occurred during connection: " + err);
});

var backupSchema = new Schema({
  teststring: String
}, {
  timestamps: true
});

var slotSchema = new Schema({
  _id: { type: String, required: true },
  assignment: {
    id: { type: String, required: true },
    name: String
  },
  assignee: {
    id: { type: String, required: true },
    name: String
  }
});

var dateCardSchema = new Schema({
  _id: { type: String, required: true },
  dateScheduled: { type: String, required: true },
  label: { type: String },
  slots: [slotSchema]
});

// Ensure virtual fields are serialised.
dateCardSchema.set("toJSON", {
  virtuals: true
});
slotSchema.set("toJSON", {
  virtuals: true
});

var DateCard = mongoose.model("DateCard", dateCardSchema);

DateCard.count(function(err, result) {
  if (err) console.log(err);
  else console.log("Result: " + result);
});

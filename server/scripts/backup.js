/*eslint no-console: ["error", { allow: ["log", "warn", "error"] }] */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var dbconnect = require("../db_connect");

dbconnect();

var DateCard = require("../models/DateCard");

var backupSchema = new Schema({
  backup: [Schema.Types.Mixed]
}, {
  timestamps: true  // adds createdAt and updatedAt
});

var Backup = mongoose.model("Backup", backupSchema);

DateCard.find().lean().exec(function(err, datecards) {
  if (err) console.log(err);
  else {
    Backup.create({ backup: datecards }, function (err, result) {
      if (err) console.log(err);
      else console.log(result);
    });
  }
});

// delete any backups older than 5 days
var weekOld = new Date();
weekOld.setDate(weekOld.getDate() - 5);
Backup.remove({ createdAt: {$lt: weekOld }}, function (err, result) {
  if (err) console.log(err);
  else console.log(result);
});

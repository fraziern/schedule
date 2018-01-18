/*eslint no-console: ["error", { allow: ["log", "warn", "error"] }] */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var dbconnect = require("../db_connect");
// var Promise = require("bluebird");

dbconnect();

var DateCard = require("../models/DateCard");

var backupSchema = new Schema(
  {
    backup: [Schema.Types.Mixed]
  },
  {
    timestamps: true // adds createdAt and updatedAt
  }
);

var Backup = mongoose.model("Backup", backupSchema);

var createPromise = new Promise(function(resolve, reject) {
  DateCard.find()
    .lean()
    .exec(function(err, datecards) {
      if (err) reject("find error");
      else {
        Backup.create({ backup: datecards }, function(err) {
          if (err) reject("create error");
          else resolve("Created backup.");
        });
      }
    });
});

var deletePromise = new Promise(function(resolve, reject) {
  // delete any backups older than 5 days
  var weekOld = new Date();
  weekOld.setDate(weekOld.getDate() - 5);
  Backup.remove({ createdAt: { $lt: weekOld } }, function(err) {
    if (err) reject("delete error");
    else resolve("Deleted old stuff.");
  });
});

Promise.all([createPromise, deletePromise]).then(function(values) {
  values.map(v => console.log(v));
  console.log("Done, exiting now.");
  process.exit(0);
});

// 15 second timeout as a fallback
setTimeout(function() {
  console.log("Timed out.");
  process.exit(0);
}, 15000);

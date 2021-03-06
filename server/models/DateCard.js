var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Use native promises
mongoose.Promise = global.Promise;

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

module.exports = mongoose.model("DateCard", dateCardSchema);

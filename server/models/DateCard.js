var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var slotSchema = new Schema({
  _id: { type: String, required: true },
  assignment: {
    id: String,
    name: String
  },
  assignee: {
    id: String,
    name: String
  }
});

var dateCardSchema = new Schema({
  _id: { type: String, required: true },
  dateScheduled: { type: String, required: true },
  slots: [slotSchema]
});

// Return id instead of _id
// Duplicate the ID field.
// dateCardSchema.virtual("id").get(function(){
//   return this._id.toHexString();
// });
// slotSchema.virtual("id").get(function(){
//   return this._id.toHexString();
// });

// Ensure virtual fields are serialised.
dateCardSchema.set("toJSON", {
  virtuals: true
});
slotSchema.set("toJSON", {
  virtuals: true
});

module.exports = mongoose.model("DateCard", dateCardSchema);

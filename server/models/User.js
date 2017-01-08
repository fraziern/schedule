var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Use native promises
mongoose.Promise = global.Promise;

var userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});

userSchema.methods.validPassword = function( pwd ) {
  return ( this.password === pwd );
};

module.exports = mongoose.model("User", userSchema);

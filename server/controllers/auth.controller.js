// SERVER SIDE
var User = require("../models/User.js");
var passport = require("passport");

var AuthController = function() {
  function login(req, res, next) {
    passport.authenticate("local", function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.json(info); } // should we use info here?
      req.login(user, function(err) {
        if (err) { return next(err); }
        return res.json({ user: user });
      });
    })(req, res, next);
  }

  function verify(username, password, done){
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: "Invalid credentials" });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: "Invalid password" });
      }
      return done(null, user);
    });
  }

  function loggedin(req, res) {
    return res.json(req.isAuthenticated() ? req.user : null);
  }

  return {
    login,
    verify,
    loggedin
  };
}();

module.exports = AuthController;

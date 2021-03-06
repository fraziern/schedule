var AuthController = require("../controllers/auth.controller");

var express = require("express");
var Router = express.Router;

var router = new Router();

// Login
router.route("/login").post(AuthController.login);
router.route("/loggedin").get(AuthController.loggedin);

module.exports = router;

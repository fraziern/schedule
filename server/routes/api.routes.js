var DateCardController = require("../controllers/dateCard.controller");

var express = require("express");
var Router = express.Router;

var router = new Router();

// Get all datecards
router.route("/all").get(DateCardController.getDateCards);

// add a datecard
router.route("/add").post(DateCardController.addDateCard);

// update assignee
router.route("/update-assignee/:slotid").post(DateCardController.updateAssignee);

// Delete a datecard
router.route("/del/:id").delete(DateCardController.deleteDateCard);

module.exports = router;

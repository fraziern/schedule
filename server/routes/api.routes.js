var DateCardController = require("../controllers/dateCard.controller");

var express = require("express");
var Router = express.Router;

var router = new Router();

// Get all datecards
router.route("/all").get(DateCardController.getDateCards);

// add a datecard
router.route("/add").post(DateCardController.addDateCard);

// update assignee
router
  .route("/update-assignee/:slotid")
  .post(DateCardController.updateAssignee);

// update label
router.route("/update-label/:cardid").post(DateCardController.updateLabel);

// add slot to existing datecard
router.route("/add-slot/:cardid").post(DateCardController.addSlotToCard);

// remove slot from card
router
  .route("/remove-slot/:slotid")
  .delete(DateCardController.deleteSlotFromCard);

// replace all slots in a card
router.route("/update-slots/:cardid").post(DateCardController.updateAllSlots);

// Delete a datecard
router.route("/del/:id").delete(DateCardController.deleteDateCard);

module.exports = router;

// SERVER SIDE
// TODO: clean this up using Mongoose syntax instead of a mix between
// Mongoose and Mongo
var DateCard = require("../models/DateCard.js");

var DateCardController = function() {
  function getDateCards(req, res) {
    DateCard.find(function (err, dateCards) {
      if (err) return res.status(500).send(err);
      res.json({ dateCards });
    });
  }

  function addDateCard(req, res) {
    var newDateCard = new DateCard(req.body.dateCard);

    newDateCard.save( function(err, saved) {
      if (err) return res.status(404).send(err);
      return res.json({ saved: saved });
    });
  }

  function updateAssignee(req, res) {
    if (!req.params.slotid || !req.body.assignee) {
      return res.status(403).json(req.body).end();
    }
    // TODO: we should make sure assignee has name and id values too?

    var query = {"slots._id": req.params.slotid};
    var update = { $set: { "slots.$.assignee": req.body.assignee }};

    DateCard.update(query, update, function (err, saved) {
      if (err) return res.status(500).send(err);

      return res.json({saved: saved});
    });
  }

  function updateLabel(req, res) {
    if (!req.params.cardid || req.body.label == undefined) {
      return res.status(404).json({error: "Some parameters missing"}).end();
    }

    var dateCardId = req.params.cardid;
    var update = { $set: { "label": req.body.label }};
    DateCard.findByIdAndUpdate(dateCardId, update, {new: true}, function (err, saved) {
      if (err) return res.status(500).send(err);
      return res.json({saved: saved});
    });
  }

  function addSlotToCard(req, res) {
    if (!req.params.cardid || !req.body.slot) {
      return res.status(404).json({error: "Some parameters missing"}).end();
    } else if (!req.body.slot.assignment || !req.body.slot.assignee) {
      return res.status(404).json({error: "Some slot parameters missing"}).end();
    }

    var dateCardId = req.params.cardid;
    var slot = req.body.slot;

    var update = { $addToSet: {"slots": slot }};
    DateCard.findByIdAndUpdate(dateCardId, update, {new: true}, function (err, saved) {
      if (err) return res.status(500).send(err);
      return res.json({saved: saved});
    });
  }

  function deleteSlotFromCard(req, res) {
    if (!req.params.slotid) return res.status(404).json({id: "slotID"}).end();

    var query = {"slots._id": req.params.slotid};
    var update = { $pull: { slots: { _id: req.params.slotid }}};
    DateCard.findOneAndUpdate( query, update, {new: true}, function (err, saved) {
      if (err) return res.status(500).send(err);
      if (!saved) return res.status(404).json({error: "slot not found"}).end();
      return res.json({saved: saved});
    });
  }

  function deleteDateCard(req, res) {
    if (!req.params.id) {
      return res.status(404).json({id: "dateCardID"}).end();
    }

    var dateCardId = req.params.id;
    DateCard.findByIdAndRemove(dateCardId, function (err){
      if (err) return res.status(500).send(err);
      return res.json({removed: dateCardId});
    });
  }

  return {
    getDateCards,
    addDateCard,
    updateAssignee,
    updateLabel,
    addSlotToCard,
    deleteSlotFromCard,
    deleteDateCard
  };
}();

module.exports = DateCardController;

// SERVER SIDE
var DateCard = require("../models/DateCard.js");

var DateCardController = function() {
  function getDateCards(req, res) {
    DateCard.find()
    .select("id dateScheduled slots")
    .exec(function(err, dateCards) {
      if (err) {
        return res.status(500).send(err);
      }
      res.json({ dateCards });
    });
  }

  function addDateCard(req, res) {
    if (!req.body.dateCard.slots || !req.body.dateCard.dateScheduled) {
      return res.status(403).json({id: "dateCardID", dateScheduled: "Date"}).end();
    }

    var newDateCard = new DateCard(req.body.dateCard);

    newDateCard.save( function(err, saved) {
      if (err) return res.status(500).send(err);
      return res.json({ saved: saved });
    });
  }

  function updateAssignee(req, res) {
    if (!req.params.slotid || !req.body.assignee) {
      return res.status(403).json(req.body).end();
    }
    // TODO: we should make sure assignee has name and id values too?
    var slotId = req.params.slotid;
    var assignee = req.body.assignee;

    var query = {"slots._id": slotId};
    var update = { $set: { "slots.$.assignee": assignee }};

    DateCard.update(query, update, function (err, saved) {
      if (err) return res.status(500).send(err);
      return res.json({saved: saved});
    });
  }

  function deleteDateCard(req, res) {
    if (!req.params.id) {
      return res.status(403).json({id: "dateCardID"}).end();
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
    deleteDateCard
  };
}();

module.exports = DateCardController;

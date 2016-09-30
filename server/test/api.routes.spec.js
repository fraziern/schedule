//During the test the env variable is set to test
process.env.NODE_ENV = "test";

var mongoose = require("mongoose");
var DateCard = require("../models/DateCard");

//Require the dev-dependencies
var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe("DateCards", () => {
  beforeEach((done) => { //Before each test we empty the database
    DateCard.remove({}, (err) => {
      done();
    });
  });

  describe("GET /all", () => {
    it("it should GET all the datecards", (done) => {
      chai.request(server)
        .get("/api/all")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.dateCards.should.be.a("array");
          res.body.dateCards.length.should.be.eql(0);
          done();
        });
    });
  });

  describe("POST /add", () => {
    it("should POST an invalid datecard", (done) => {
      let dateCard = {
        "_id": "1",
        "dateScheduled": "2016-09-15T04:00:00.000Z",
        // "slots": [
        //   {
        //     "id": "542a08df-3a2a-4737-935e-ffe18722085e",
        //     "assignee": {
        //       "id": "343262",
        //       "name": "Stephanie Fraz"
        //     },
        //     "assignment": {
        //       "id": "1",
        //       "name": "Infant Nursery (A)"
        //     }
        //   }
        // ]
      };

      chai.request(server)
      .post("/add")
      .send(dateCard)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a("object");
        res.body.should.have.property("errors");
        res.body.errors.should.have.property("slots");
        res.body.errors.slots.should.have.property("kind").eql("required");
        done();
      });
    });
  });
});

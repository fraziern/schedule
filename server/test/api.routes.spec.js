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
  /*
  * Test the /GET route
  */
  describe("GET /", () => {
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
});

/*eslint no-console: ["error", { allow: ["log", "warn", "error"] }] */
require("dotenv").config({path: "../../.env", silent: true});
var DateCard = require("../models/DateCard");
var db_connect = require("../db_connect");

// connect to database
db_connect();

function seed() {
  DateCard.count().exec( function(err, count) {
    if (count > 0 || process.env.NODE_ENV === "test") {
      return;
    }

    var defaultCard1 = new DateCard({
      "_id": "123",
      "dateScheduled": "2020-09-11T04:00:00.000Z",
      "slots": [
        {
          "_id": "sd8f7tsdf7",
          "assignment": {
            "id": 1,
            "name": "Infant Nursery (A)"
          },
          "assignee": {
            "id": 1,
            "name": "Stephanie Frazier"
          }
        },
        {
          "_id": "sd8f7tsdf8",
          "assignment": {
            "id": 2,
            "name": "Infant Nursery (B)"
          },
          "assignee": {
            "id": 1,
            "name": "Stephanie Frazier"
          }
        },
        {
          "_id": "sd8f7tsdf9",
          "assignment": {
            "id": 3,
            "name": "Preschool Nursery (A)"
          },
          "assignee": {
            "id": 1,
            "name": "Stephanie Frazier"
          }
        },
        {
          "_id": "sd8f7tsd10",
          "assignment": {
            "id": 4,
            "name": "Preschool Nursery (B)"
          },
          "assignee": {
            "id": 1,
            "name": "Stephanie Frazier"
          }
        },
        {
          "_id": "sd8f7tsd11",
          "assignment": {
            "id": 5,
            "name": "Nursery On-Call"
          },
          "assignee": {
            "id": 1,
            "name": "Stephanie Frazier"
          }
        },
        {
          "_id": "sd8f7tsd12",
          "assignment": {
            "id": 6,
            "name": "Fellowship Time (A)"
          },
          "assignee": {
            "id": 1,
            "name": "Stephanie Frazier"
          }
        },
        {
          "_id": "sd8f7tsd13",
          "assignment": {
            "id": 7,
            "name": "Fellowship Time (B)"
          },
          "assignee": {
            "id": 1,
            "name": "Stephanie Frazier"
          }
        },
        {
          "_id": "sd8f7tsd14",
          "assignment": {
            "id": 8,
            "name": "Usher (A)"
          },
          "assignee": {
            "id": 1,
            "name": "Stephanie Frazier"
          }
        },
        {
          "_id": "sd8f7tsd15",
          "assignment": {
            "id": 9,
            "name": "Usher (B)"
          },
          "assignee": {
            "id": 1,
            "name": "Stephanie Frazier"
          }
        },
        {
          "_id": "sd8f7tsd16",
          "assignment": {
            "id": 10,
            "name": "Greeter (A)"
          },
          "assignee": {
            "id": 1,
            "name": "Stephanie Frazier"
          }
        },
        {
          "_id": "sd8f7tsd17",
          "assignment": {
            "id": 11,
            "name": "Greeter (B)"
          },
          "assignee": {
            "id": 1,
            "name": "Stephanie Frazier"
          }
        },
        {
          "_id": "sd8f7tsd19",
          "assignment": {
            "id": 12,
            "name": "Sound System"
          },
          "assignee": {
            "id": 1,
            "name": "Stephanie Frazier"
          }
        },
        {
          "_id": "sd8f7tsd20",
          "assignment": {
            "id": 13,
            "name": "Lay Reader"
          },
          "assignee": {
            "id": 1,
            "name": "Stephanie Frazier"
          }
        }
      ]
    });

    DateCard.create(defaultCard1, (error) => {
      if (!error) {
        console.log("db seeded...");
      }
    });
  });
}

seed();

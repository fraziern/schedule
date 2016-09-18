import assignments, * as fromAssignments from "./assignments";
import * as types from "../constants/ActionTypes";

describe("reducers", () => {
  describe("assignments", () => {

    const JSON = {
      dateCards: [
        {
          "id": 1,
          "dateScheduled": "2016-09-11T04:00:00.000Z",
          "slots": [
            {
              "id" : 1,
              "assignment": {
                "id": 1,
                "name": "Infant Nursery (A)",
              },
              "assignee": {
                "id": 1,
                "name": "Stephanie Frazier"
              }
            },
            {
              "id" : 2,
              "assignment": {
                "id": 2,
                "name": "Infant Nursery (B)",
              },
              "assignee": {
                "id": 1,
                "name": "Stephanie Frazier"
              }
            },
            {
              "id" : 300,
              "assignment": {
                "id": 3,
                "name": "Preschool Nursery (A)",
              },
              "assignee": {
                "id": 1,
                "name": "Stephanie Frazier"
              }
            }
          ]
        }
      ]};

    it("should handle RECEIVE_ALLCARDS action", () => {
      const action = {
        type: types.RECEIVE_ALLCARDS,
        dateCards: JSON.dateCards
      };

      expect(assignments(null, action)).toEqual({
        "dateCards": {
          "entities": {
            "datecards": {
              "1": {
                "id": 1,
                "dateScheduled": "2016-09-11T04:00:00.000Z",
                "slots": [
                  1,
                  2,
                  300
                ]
              }
            },
            "slots": {
              "1": {
                "id": 1,
                "assignment": 1,
                "assignee": 1
              },
              "2": {
                "id": 2,
                "assignment": 2,
                "assignee": 1
              },
              "300": {
                "id": 300,
                "assignment": 3,
                "assignee": 1
              }
            },
            "assignments": {
              "1": {
                "id": 1,
                "name": "Infant Nursery (A)"
              },
              "2": {
                "id": 2,
                "name": "Infant Nursery (B)"
              },
              "3": {
                "id": 3,
                "name": "Preschool Nursery (A)"
              }
            },
            "assignees": {
              "1": {
                "id": 1,
                "name": "Stephanie Frazier"
              }
            }
          },
          "result": [
            1
          ]
        },
        "isSaving": false,
        "unsavedChanges": false
      });
    });

    // TODO: getDateCards selector
    // This will get the dateCards info for passing to the view
    it("should handle getDateCards() selector", () => {
      const state = {
        "dateCards": {
          "entities": {
            "datecards": {
              "1": {
                "id": 1,
                "dateScheduled": "2016-09-11T04:00:00.000Z",
                "slots": [
                  1,
                  2,
                  3
                ]
              }
            },
            "slots": {
              "1": {
                "id": 1,
                "assignment": 1,
                "assignee": 1
              },
              "2": {
                "id": 2,
                "assignment": 2,
                "assignee": 1
              },
              "3": {
                "id": 3,
                "assignment": 3,
                "assignee": 1
              }
            },
            "assignments": {
              "1": {
                "id": 1,
                "name": "Infant Nursery (A)"
              },
              "2": {
                "id": 2,
                "name": "Infant Nursery (B)"
              },
              "3": {
                "id": 3,
                "name": "Preschool Nursery (A)"
              }
            },
            "assignees": {
              "1": {
                "id": 1,
                "name": "Stephanie Frazier"
              }
            }
          },
          "result": [
            1
          ]
        },
        "isSaving": false,
        "unsavedChanges": false
      };

      expect(fromAssignments.getDateCards(state).toEqual({
        dateCards: [
          {
            "id": 1,
            "dateScheduled": "2016-09-11T04:00:00.000Z",
            "slots": [
              {
                "id" : 1,
                "assignment": {
                  "id": 1,
                  "name": "Infant Nursery (A)",
                },
                "assignee": {
                  "id": 1,
                  "name": "Stephanie Frazier"
                }
              },
              {
                "id" : 2,
                "assignment": {
                  "id": 2,
                  "name": "Infant Nursery (B)",
                },
                "assignee": {
                  "id": 1,
                  "name": "Stephanie Frazier"
                }
              },
              {
                "id" : 3,
                "assignment": {
                  "id": 3,
                  "name": "Preschool Nursery (A)",
                },
                "assignee": {
                  "id": 1,
                  "name": "Stephanie Frazier"
                }
              }
            ]
          }
        ]
      }));
    });
  });
});

import * as fromAccessors from "./accessors.js";

describe("reducers", () => {
  describe("accessors", () => {

    it("should handle updateSlotAssignee() setter", () => {
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

      expect(fromAccessors.updateSlotAssignee(state, 1, "Nick Frazier")).toEqual({
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
                "assignee": 2
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
      });
    });
  });
});

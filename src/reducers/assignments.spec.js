import assignments from "./assignments";
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
      ]};

    it("should handle RECEIVE_ALLCARDS action", () => {
      const action = {
        type: types.RECEIVE_ALLCARDS,
        dateCards: JSON.dateCards
      };

      expect(assignments(null, action)).toEqual({
        "dateCards": [
          {
            "id": 1,
            "dateScheduled": "2016-09-11T04:00:00.000Z",
            "slots": [
              { "id": 1,
              "assignment": "Infant Nursery (A)", "assignee": "Stephanie Frazier" },
              { "id": 2,
               "assignment": "Infant Nursery (B)", "assignee": "Stephanie Frazier" },
              { "id": 3,
               "assignment": "Preschool Nursery (A)", "assignee": "Stephanie Frazier" }
            ]
          }
        ],
        "isSaving": false,
        "unsavedChanges": false
      });
    });

    it("should handle UPDATE_ASSIGNMENT action", () => {
      const state = {
        dateCards: [
          {
            "id": 1,
            "dateScheduled": "2016-09-11T04:00:00.000Z",
            "slots": [
              { "id": 1,
              "assignment": "Infant Nursery (A)", "assignee": "Stephanie Frazier" },
              { "id": 2,
               "assignment": "Infant Nursery (B)", "assignee": "Stephanie Frazier" },
              { "id": 3,
               "assignment": "Preschool Nursery (A)", "assignee": "Stephanie Frazier" }
            ]
          }
        ]
      };
      const action = {
        type: types.UPDATE_ASSIGNMENT,
        assignmentId: 1,
        assignee: "Nick Frazier"
      };

      expect(assignments(state, action)).toEqual({
        dateCards: [
          {
            "id": 1,
            "dateScheduled": "2016-09-11T04:00:00.000Z",
            "slots": [
              { "id": 1,
              "assignment": "Infant Nursery (A)", "assignee": "Nick Frazier" },
              { "id": 2,
               "assignment": "Infant Nursery (B)", "assignee": "Stephanie Frazier" },
              { "id": 3,
               "assignment": "Preschool Nursery (A)", "assignee": "Stephanie Frazier" }
            ]
          }
        ],
        "isSaving": true,
        "unsavedChanges": false
      });
    });

    it("should handle UPDATE_UNSAVED_ASSN action", () => {
      const state = {
        dateCards: [
          {
            "id": 1,
            "dateScheduled": "2016-09-11T04:00:00.000Z",
            "slots": [
              { "id": 1,
              "assignment": "Infant Nursery (A)", "assignee": "Stephanie Frazier" },
              { "id": 2,
               "assignment": "Infant Nursery (B)", "assignee": "Stephanie Frazier" },
              { "id": 3,
               "assignment": "Preschool Nursery (A)", "assignee": "Stephanie Frazier" }
            ]
          }
        ],
        unsavedAssn: {
          1: "Bobby Frazier"
        }
      };
      let action = {
        type: types.UPDATE_UNSAVED_ASSN,
        assignmentId: 1,
        assignee: "Bobby Frazie"
      };

      expect(assignments(state, action)).toEqual(
        {
          dateCards: [
            {
              "id": 1,
              "dateScheduled": "2016-09-11T04:00:00.000Z",
              "slots": [
                { "id": 1,
                "assignment": "Infant Nursery (A)", "assignee": "Stephanie Frazier" },
                { "id": 2,
                 "assignment": "Infant Nursery (B)", "assignee": "Stephanie Frazier" },
                { "id": 3,
                 "assignment": "Preschool Nursery (A)", "assignee": "Stephanie Frazier" }
              ]
            }
          ],
          unsavedAssn: {
            1: "Bobby Frazie"
          }
        }
      );
      action = {
        type: types.UPDATE_UNSAVED_ASSN,
        assignmentId: 2,
        assignee: "Bobby Frazier"
      };
      expect(assignments(state, action)).toEqual(
        {
          dateCards: [
            {
              "id": 1,
              "dateScheduled": "2016-09-11T04:00:00.000Z",
              "slots": [
                { "id": 1,
                "assignment": "Infant Nursery (A)", "assignee": "Stephanie Frazier" },
                { "id": 2,
                 "assignment": "Infant Nursery (B)", "assignee": "Stephanie Frazier" },
                { "id": 3,
                 "assignment": "Preschool Nursery (A)", "assignee": "Stephanie Frazier" }
              ]
            }
          ],
          unsavedAssn: {
            1: "Bobby Frazier",
            2: "Bobby Frazier"
          }
        }
      );
    });
  });
});

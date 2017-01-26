import assignments from "../reducers/assignments";
import {getVisibleDateCardsAndDenormalize} from "../selectors";
import * as types from "../constants/ActionTypes";
import moment from "moment";

describe("reducers", () => {
  describe("assignments", () => {

    const JSON = {
      normalizedDateCards: {
        entities: {
          assignees: {
            1: {
              id: "1",
              name: "Nick"
            }
          },
          assignments: {
            1: {
              id: "1",
              name: "Coder"
            }
          },
          dateCards: {
            1: {
              dateScheduled: moment().startOf("date").add(2, "weeks").format(),
              id: "1",
              slots: ["1"]
            }
          },
          slots: {
            1: {
              id: "1",
              assignee: "1",
              assignment: "1"
            }
          }
        },
        result: ["1"]
      }
    };
    const state = {
      isSaving: false,
      isLoaded: true,
      loggedInUser: null,
      currentDate: moment().startOf("date").format(),
      cutoffDate: moment().startOf("date").add(2, "weeks").format(),
      startDate: moment().startOf("date").format(),
      stopDate: "",
      filter: "ALL",
      entities: JSON.normalizedDateCards.entities,
      sortedCards: ["1"]
    };

    it("should handle RECEIVE_ALLCARDS action", () => {
      const action = {
        type: types.RECEIVE_ALLCARDS,
        dateCards: JSON.normalizedDateCards
      };

      expect(assignments(null, action).entities).toEqual(JSON.normalizedDateCards.entities);
    });

    // This will get the dateCards info for passing to the view
    it("should handle getVisibleDateCardsAndDenormalize() selector", () => {
      const combinedState = {assignments: state};
      expect(getVisibleDateCardsAndDenormalize(combinedState)).toEqual([
        {
          "id":"1",
          "dateScheduled": moment().startOf("date").add(2, "weeks").format(),
          "label": undefined,
          "slots":[
            {
              "id":"1",
              "assignment":{
                "id":"1",
                "name":"Coder"
              },
              "assignee":{
                "id":"1",
                "name":"Nick"
              },
              "saved": undefined,
              "isSaving": undefined
            }
          ]
        }
      ]);
    });
  });
});

import assignments from "../reducers/assignments";
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
    const newSlot = {
      _id: "3",
      assignment: {
        id: "1"
      },
      assignee: {
        id: "1"
      }
    };

    it("should handle RECEIVE_ALLCARDS action", () => {
      const action = {
        type: types.RECEIVE_ALLCARDS,
        dateCards: JSON.normalizedDateCards
      };
      expect(assignments(null, action).entities).toEqual(JSON.normalizedDateCards.entities);
    });

    it("should handle ADD_DATECARD action", () => {
      const action = {
        type: types.ADD_DATECARD,
        card: {
          entities: {
            dateCards: {
              "2": {
                "id":"2",
                "dateScheduled": moment().startOf("date").add(3, "weeks").format(),
                "label": undefined,
                "slots":["2"]
              }
            },
            slots: {
              "2": {
                "id": "2",
                assignment: "1",
                assignee: "1"
              }
            }
          },
          result: "2"
        }
      };
      expect(assignments(state, action).sortedCards).toEqual(["1", "2"]);
    });

    it("should handle SAVING_ASSIGNEE action", () => {
      const action = {
        type: types.SAVING_ASSIGNEE,
        id: "1"
      };
      const newState = assignments(state, action);
      expect(newState.entities.slots["1"].isSaving).toBeTruthy();
    });

    it("should handle UPDATE_ASSIGNEE action", () => {
      const action = {
        type: types.UPDATE_ASSIGNEE,
        id: "1",
        assignee: {
          id: "2",
          name: "Blerg"
        }
      };
      const newState = assignments(state, action);
      expect(newState.entities.slots[action.id].assignee).toEqual(action.assignee.id);
    });

    it("should handle UPDATE_LABEL action", () => {
      const action = {
        type: types.UPDATE_LABEL,
        cardID: "1",
        label: "New Label"
      };
      const newState = assignments(state, action);
      expect(newState.entities.dateCards[action.cardID].label).toEqual(action.label);
    });

    it("should handle MARK_UNSAVED action", () => {
      const action = {
        type: types.MARK_UNSAVED,
        id: "1"
      };
      const newState = assignments(state, action);
      expect(newState.entities.slots[action.id].saved).toBeFalsy();
    });

    it("should handle ADD_ASSIGNEE action", () => {
      const action = {
        type: types.ADD_ASSIGNEE,
        id: "3",
        name: "Bleep"
      };
      const newState = assignments(state, action);
      expect(newState.entities.assignees[action.id]).toBeDefined();
    });

    it("should handle ADD_SLOT action", () => {
      const action = {
        type: types.ADD_SLOT,
        slot: newSlot
      };
      const newState = assignments(state, action);
      expect(newState.entities.slots[action.slot._id]).toBeDefined();
    });

    it("should handle ADD_SLOT_TO_CARD action", () => {
      const action = {
        type: types.ADD_SLOT_TO_CARD,
        cardID: "1",
        slot: newSlot
      };
      const newEntities = assignments(state, action).entities;
      expect(newEntities.dateCards[action.cardID].slots).toContain(action.slot._id);
      expect(newEntities.slots[action.slot._id]).toBeDefined();
    });

    it("should handle ADD_ASSIGNMENT action", () => {
      const action = {
        type: types.ADD_ASSIGNMENT,
        id: "3",
        name: "Bleeper"
      };
      const newState = assignments(state, action);
      expect(newState.entities.assignments[action.id]).toBeDefined();
    });

    it("should handle DELETE_SLOT_FROM_CARD action", () => {
      const action = {
        type: types.DELETE_SLOT_FROM_CARD,
        cardID: "1",
        slotID: "1"
      };
      const newEntities = assignments(state, action).entities;
      const oldSlotLength = state.entities.dateCards[action.cardID].slots.length;
      const newSlotLength = newEntities.dateCards[action.cardID].slots.length;
      expect(oldSlotLength).toBeGreaterThan(newSlotLength);
    });

    it("should handle DELETE_CARD action", () => {
      const action = {
        type: types.DELETE_CARD,
        cardID: "1"
      };
      const newEntities = assignments(state, action).entities;
      expect(newEntities.dateCards[action.cardID]).toBeUndefined();
    });

  });
});

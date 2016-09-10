import assignments from "./assignments";

describe("reducers", () => {
  describe("assignments", () => {
    it("should handle RECEIVE_ALLCARDS action", () => {
      const action = {
        type: "RECEIVE_ALLCARDS",
        dateCards: [
          {
            "dateScheduled": "2016-09-11T04:00:00.000Z",
            "slots": [
              { "assignment": "Infant Nursery (A)", "assignee": "Stephanie Frazier" },
              { "assignment": "Infant Nursery (B)", "assignee": "Stephanie Frazier" },
              { "assignment": "Preschool Nursery (A)", "assignee": "Stephanie Frazier" }
            ]
          }]
      };

      expect(assignments({}, action)).toEqual({
        dateCards: [
          {
            "dateScheduled": "2016-09-11T04:00:00.000Z",
            "slots": [
              { "assignment": "Infant Nursery (A)", "assignee": "Stephanie Frazier" },
              { "assignment": "Infant Nursery (B)", "assignee": "Stephanie Frazier" },
              { "assignment": "Preschool Nursery (A)", "assignee": "Stephanie Frazier" }
            ]
          }
        ]
      });

    });
  });
});

var accessors = require("../reducers/assignmentsAccessors.js");
// var expect = require("chai").expect;

describe("reducers", () => {
  describe("accessors", () => {

    it("should handle getLastNormDatecard() getter", () => {
      const state = {
        "entities": {
          "dateCards": {
            "1": {
              "dateScheduled": "2016-09-11T04:00:00.000Z",
              "stuff": "things"
            },
            "2": {
              "dateScheduled": "2016-09-18T04:00:00.000Z",
              "stuff": "things2"
            },
            "3": {
              "dateScheduled": "2016-10-11T04:00:00.000Z",
              "stuff": "things3"
            }
          }
        }
      };
      let output = accessors.getLastNormDatecard(state);
      expect(output.stuff).toEqual("things3");
      expect(output.dateScheduled).toEqual("2016-10-11T04:00:00.000Z");
    });
  });
});

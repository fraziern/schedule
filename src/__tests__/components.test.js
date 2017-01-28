import React from "react";
import FilterRange from "../components/FilterRange.js";
import Selector from "../components/Selector.js";
import { ReportFilters } from "../components/ReportFilters.js";
import renderer from "react-test-renderer";

describe("Components", function() {
  describe("<ReportFilters />", function() {
    it("renders correctly", function() {
      var myMock = jest.fn();
      let tree = renderer.create(
        <ReportFilters
          reportFilter="1 Year"
          updateReportFilter={myMock}
          />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe("<Selector />", function() {
    it("renders correctly", function() {
      var myMock = jest.fn();
      let tree = renderer.create(
        <Selector
          selectorValue=""
          assignmentName=""
          isDisabled={false}
          handleSelectorChange={myMock}
          handleSelectorFocus={myMock}
          handleSelectorBlur={myMock}
          handleSelectorEnter={myMock}
          registerInput={myMock}
          />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe("<FilterRange />", function() {
    it("renders correctly", function() {
      var myMock = jest.fn();
      var tree = renderer.create(
        <FilterRange
          handleStartChange={myMock}
          handleStopChange={myMock}
          handleStartSubmit={myMock}
          handleStopSubmit={myMock}
          startValue=""
           />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});

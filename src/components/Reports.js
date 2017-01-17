import React, { Component } from "react";
import ReportAssigneeSignups from "./ReportAssigneeSignups";
import ReportEmptySlots from "./ReportEmptySlots";
import ReportFilters from "./ReportFilters";

class Reports extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <ReportFilters />
        <ReportEmptySlots />
        <ReportAssigneeSignups />
      </div>
    );
  }
}

export default Reports;

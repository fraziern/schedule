import React, { Component } from "react";
import ReportAssigneeSignups from "./ReportAssigneeSignups";
import ReportEmptySlots from "./ReportEmptySlots";

class Reports extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <ReportEmptySlots />
        <ReportAssigneeSignups />
      </div>
    );
  }
}

export default Reports;

import React, { Component } from "react";
import ReportAssigneeSignups from "./ReportAssigneeSignups";

class Reports extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <ReportAssigneeSignups />
      </div>
    );
  }
}

export default Reports;

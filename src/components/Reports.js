import React from "react";
import ReportAssigneeSignups from "./ReportAssigneeSignups";
import ReportEmptySlots from "./ReportEmptySlots";
import ReportFilters from "./ReportFilters";

function Reports() {
  return (
    <div>
      <ReportFilters />
      <ReportEmptySlots />
      <ReportAssigneeSignups />
    </div>
  );
}

export default Reports;

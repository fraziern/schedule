import Bundle from "./Bundle";
import React from "react";
import loadReports from "bundle-loader?lazy!../components/Reports";

const Reports = () => (
  <Bundle load={loadReports}>
    {Reports => (Reports ? <Reports /> : <div>Loading</div>)}
  </Bundle>
);

export default Reports;

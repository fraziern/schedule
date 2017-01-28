import React, { PropTypes } from "react";
import FilterButton from "./FilterButton.js";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateReportFilter } from "../actions";

export function ReportFilters(props) {
  return (
    <div className="report-filterbar menubar">
      <div className="filter-buttons">
        <FilterButton filter="Year" label="1 Year" onClick={props.updateReportFilter} filterStatus={props.reportFilter}/>
        <FilterButton filter="9 Months" label="9 Months" onClick={props.updateReportFilter} filterStatus={props.reportFilter}/>
        <FilterButton filter="6 Months" label="6 Months" onClick={props.updateReportFilter} filterStatus={props.reportFilter}/>
        <FilterButton filter="3 Months" label="3 Months" onClick={props.updateReportFilter} filterStatus={props.reportFilter}/>
      </div>
    </div>
  );
}

ReportFilters.propTypes = {
  reportFilter: PropTypes.string.isRequired,
  updateReportFilter: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return { reportFilter: state.reports.reportFilter };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateReportFilter }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportFilters);

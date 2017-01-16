import React, { Component, PropTypes } from "react";
import FilterButton from "./FilterButton.js";
import { connect } from "react-redux";
import { updateSignupFilter } from "../actions";

class ReportAssigneeSignupFilters extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(filter) {
    this.props.dispatch(updateSignupFilter(filter));
  }

  render() {

    return (
      <div className="report-assigneesignups-filterbar menubar">
        <div className="filter-buttons">
          <FilterButton filter="Year" label="1 Year" onClick={this.handleChange} filterStatus={this.props.reportFilter}/>
          <FilterButton filter="9 Months" label="9 Months" onClick={this.handleChange} filterStatus={this.props.reportFilter}/>
          <FilterButton filter="6 Months" label="6 Months" onClick={this.handleChange} filterStatus={this.props.reportFilter}/>
          <FilterButton filter="3 Months" label="3 Months" onClick={this.handleChange} filterStatus={this.props.reportFilter}/>
        </div>
      </div>
    );
  }
}

ReportAssigneeSignupFilters.propTypes = {
  reportFilter: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    reportFilter: state.reports.assigneeSignupFilter
  };
}

export default connect(mapStateToProps)(ReportAssigneeSignupFilters);

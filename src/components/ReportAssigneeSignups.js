import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { getAssigneeRankingsByFilter } from "../selectors";
import ReactTable from "react-table";
import ReportAssigneeSignupFilters from "./ReportAssigneeSignupFilters";

class ReportAssigneeSignups extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    let assigneeTable = null;
    if (this.props.assigneeRank) {
      let assigneeList = [];

      for (let el in this.props.assigneeRank) {
        const { assignee, frequency } = this.props.assigneeRank[el];
        // filter out blanks
        if (assignee !== "") assigneeList.push({ assignee, frequency });
      }

      const columns = [{
        header: "Volunteer",
        accessor: "assignee",
        sortable: true
      },{
        header: "Signups",
        accessor: "frequency",
        sortable: true,
        sort: "desc"
      }];

      assigneeTable = (
        <ReactTable data={assigneeList} columns={columns} />
      );
    }

    return (
      <div className="report-assigneesignups">
        <h2>Signups in Last {this.props.reportFilter}</h2>
        <ReportAssigneeSignupFilters />
        {assigneeTable}
      </div>
    );
  }
}

ReportAssigneeSignups.propTypes = {
  assigneeRank: PropTypes.object,
  reportFilter: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    assigneeRank: getAssigneeRankingsByFilter(state.assignments, state.reports.assigneeSignupFilter),
    reportFilter: state.reports.assigneeSignupFilter
  };
}

export default connect(
  mapStateToProps,
  null
)(ReportAssigneeSignups);

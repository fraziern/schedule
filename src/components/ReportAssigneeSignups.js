import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { getAssigneeRankingsByFilter } from "../selectors";
import ReactTable from "react-table";

function ReportAssigneeSignups(props) {

  let assigneeTable = null;
  if (props.assigneeRank) {
    let assigneeList = [];

    for (let el in props.assigneeRank) {
      const { assignee, frequency } = props.assigneeRank[el];
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
      <h2>Signups in Last {props.reportFilter}</h2>
      {assigneeTable}
    </div>
  );

}

ReportAssigneeSignups.propTypes = {
  assigneeRank: PropTypes.object,
  reportFilter: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    assigneeRank: getAssigneeRankingsByFilter(state.assignments, state.reports.reportFilter),
    reportFilter: state.reports.reportFilter
  };
}

export default connect(
  mapStateToProps,
  null
)(ReportAssigneeSignups);

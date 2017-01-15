import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { getAssigneeRankings } from "../selectors";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

class Reports extends Component {

  constructor(props) {
    super(props);
    this.state = { filter: "", sort: "" };
  }

  render() {

    let assigneeTable = null;
    if (this.props.assigneeRank) {
      let assigneeList = [];
      // for (let e in this.props.assigneeRank) sortedAssigneeIDs.push(e);
      // sortedAssigneeIDs.sort((a,b) => {
      //   return this.props.assigneeRank[a].frequency - this.props.assigneeRank[b].frequency;
      // });
      // let assigneeList = sortedAssigneeIDs.map((el) => {
      //   const { assignee, frequency } = this.props.assigneeRank[el];
      //   return { assignee, frequency };
      // });
      for (let el in this.props.assigneeRank) {
        const { assignee, frequency } = this.props.assigneeRank[el];
        assigneeList.push({ assignee, frequency });
      }

      const options = {
        defaultSortName: "frequency",
        defaultSortOrder: "desc"
      };

      assigneeTable = (
        <BootstrapTable data={assigneeList} striped={true} options={options} condensed>
          <TableHeaderColumn dataField="assignee" isKey={true} dataSort={true}>Volunteer</TableHeaderColumn>
          <TableHeaderColumn dataField="frequency" dataSort={true}>Signups</TableHeaderColumn>
        </BootstrapTable>
      );
    }

    return (
      <div>
        {assigneeTable}
      </div>
    );
  }
}

Reports.propTypes = {
  assigneeRank: PropTypes.object
};

function mapStateToProps(state) {
  return {
    assigneeRank: getAssigneeRankings(state.assignments)
  };
}

export default connect(
  mapStateToProps,
  null
)(Reports);

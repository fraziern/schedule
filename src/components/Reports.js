import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { getAssigneeRankings } from "../selectors";

class Reports extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        {this.props.assigneeRank}
      </div>
    );
  }
}

Reports.propTypes = {
  assigneeRank: PropTypes.object
};

function mapStateToProps(state) {
  return {
    assigneeRank: getAssigneeRankings(state.assignments, state.assignments.startDate, state.assignments.stopDate)
  };
}

export default connect(
  mapStateToProps,
  null
)(Reports);

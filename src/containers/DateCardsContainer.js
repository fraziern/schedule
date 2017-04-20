import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import Sidebar from "../components/Sidebar";
import DateCards from "../components/DateCards";
import { getVisibleDateCardsAndDenormalize } from "../selectors";

export class DateCardsContainer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="datecards-top-container">
        <DateCards {...this.props} />
        <Sidebar {...this.props} />
      </div>
    );
  }
}

DateCardsContainer.propTypes = {
  admin: PropTypes.bool,
  isLoaded: PropTypes.bool.isRequired,
  cutoffDate: PropTypes.string.isRequired,
  dateCards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    dateScheduled: PropTypes.string.isRequired,
    slots: PropTypes.arrayOf(PropTypes.shape({
      assignment: PropTypes.string.isRequired,
      assignee: PropTypes.string.isRequired,
      saved: PropTypes.bool,
      isSaving: PropTypes.bool
    })).isRequired
  }))
};

function mapStateToProps(state) {
  return {
    dateCards: getVisibleDateCardsAndDenormalize(state),
    unsavedChanges: state.assignments.unsavedChanges,
    isLoaded: state.assignments.isLoaded,
    cutoffDate: state.assignments.cutoffDate
  };
}

export default connect(
  mapStateToProps
)(DateCardsContainer);

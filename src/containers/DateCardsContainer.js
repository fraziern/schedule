import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Sidebar from "../components/Sidebar";
import DateCards from "../components/DateCards";
import { getVisibleDateCardsAndDenormalize } from "../selectors";
import SmoothScroll from "../utils/SmoothScroll.js";

export class DateCardsContainer extends Component {
  constructor(props) {
    super(props);
  }

  handleDayClick(id) {
    SmoothScroll.scrollTo(id);
  }

  render() {
    return (
      <div className="datecards-top-container">
        <DateCards {...this.props} />
        <Sidebar {...this.props} handleDayClick={this.handleDayClick} />
      </div>
    );
  }
}

DateCardsContainer.propTypes = {
  admin: PropTypes.bool,
  isLoaded: PropTypes.bool.isRequired,
  cutoffDate: PropTypes.string.isRequired,
  dateCards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string,
      labelSaving: PropTypes.bool,
      labelSaved: PropTypes.bool,
      dateScheduled: PropTypes.string.isRequired,
      slots: PropTypes.arrayOf(
        PropTypes.shape({
          assignment: PropTypes.object.isRequired,
          assignee: PropTypes.object.isRequired,
          saved: PropTypes.bool,
          isSaving: PropTypes.bool
        })
      ).isRequired
    })
  )
};

function mapStateToProps(state) {
  return {
    dateCards: getVisibleDateCardsAndDenormalize(state),
    unsavedChanges: state.assignments.unsavedChanges,
    isLoaded: state.assignments.isLoaded,
    cutoffDate: state.assignments.cutoffDate
  };
}

export default connect(mapStateToProps)(DateCardsContainer);

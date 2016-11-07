import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import DateCard from "./DateCard";
import * as fromAssignments from "../reducers/assignments";

class DateCards extends Component {

  constructor(props) {
    super(props);
    this.isLocked = this.isLocked.bind(this);
  }

  isLocked(cutoff, cardDate) {
    if (cutoff > cardDate) return "true";
    return "";
  }

  render() {
    let dateCards = (!this.props.isLoaded) ?
      "Loading..." :
     this.props.dateCards.map((card) =>
       (<DateCard {...card} key={card.id} isDisabled={this.isLocked(this.props.cutoffDate, card.dateScheduled)} />)
     );

    return (
      <div className="datecards">
        {dateCards}
      </div>
    );
  }
}

DateCards.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  cutoffDate: PropTypes.string.isRequired,
  dateCards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string,
    dateScheduled: PropTypes.string.isRequired,
    slots: PropTypes.arrayOf(PropTypes.shape({
      assignment: PropTypes.string.isRequired,
      assignee: PropTypes.string.isRequired,
      saved: PropTypes.bool,
      isSaving: PropTypes.bool
    })).isRequired
  })).isRequired
};

function mapStateToProps(state) {
  return {
    dateCards: fromAssignments.getVisibleDateCards(state),
    unsavedChanges: state.unsavedChanges,
    isLoaded: state.isLoaded,
    cutoffDate: state.cutoffDate
  };
}

export default connect(
  mapStateToProps
)(DateCards);

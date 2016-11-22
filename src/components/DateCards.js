import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import DateCard from "./DateCard";
import NewCardSelector from "./NewCardSelector";
import * as fromAssignments from "../reducers/assignments";

class DateCards extends Component {

  constructor(props) {
    super(props);
    this.isLocked = this.isLocked.bind(this);
  }

  isLocked(cutoff, cardDate) {
    if (!this.props.admin && (cutoff > cardDate)) return true;
    return false;
  }

  render() {
    let conditionalNewCardSelector = (this.props.admin) ? (<NewCardSelector />) : null;

    let dateCards = (!this.props.isLoaded) ?
      "Loading..." :
     this.props.dateCards.map((card) =>
       (<DateCard {...card} key={card.id} admin={this.props.admin || ""} isDisabled={this.isLocked(this.props.cutoffDate, card.dateScheduled)} />)
     );

    return (
      <div>
        <div className="datecards">
          {dateCards}
        </div>
        {conditionalNewCardSelector}
      </div>
    );
  }
}

DateCards.propTypes = {
  admin: PropTypes.string,
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

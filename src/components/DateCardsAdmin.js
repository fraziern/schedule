import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import DateCard from "./DateCard";
import NewCardSelector from "./NewCardSelector";
import * as fromAssignments from "../reducers/assignments";

class DateCards extends Component {

  constructor(props) {
    super(props);
    // this.isLocked = this.isLocked.bind(this);
  }

  // isLocked(cutoff, cardDate) {
  //   if (cutoff > cardDate) return "true";
  //   return "";
  // }

  render() {
    let dateCards = (!this.props.isLoaded) ?
      "Loading..." :
     this.props.dateCards.map((card) =>
       (<DateCard {...card} key={card.id} admin="true" />)
     );

    return (
      <div>
        <div className="datecards">
          {dateCards}
        </div>
        <NewCardSelector />
      </div>
    );
  }
}

DateCards.PropTypes = {
  dateCards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    dateScheduled: PropTypes.string.isRequired,
    slots: PropTypes.arrayOf(PropTypes.shape({
      assignment: PropTypes.string.isRequired,
      assignee: PropTypes.string.isRequired
    }))
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

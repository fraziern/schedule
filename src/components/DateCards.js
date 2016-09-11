import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import DateCard from "./DateCard";

class DateCards extends Component {

  render() {
    let dateCards = (!this.props) ?
      "Loading..." :
     this.props.dateCards.map((card) =>
       (<DateCard {...card} key={card.id} />)
     );

    return (
      <div>
        <p className="test-output" height="20px">{this.props.unsavedChanges ? "Unsaved Changes" : ""}</p>
        <div className="date-cards">
          {dateCards}
          </div>
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
    dateCards: state.dateCards,
    unsavedChanges: state.unsavedChanges
  };
}

export default connect(
  mapStateToProps
)(DateCards);

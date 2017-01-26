import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import Menubar from "./Menubar";
import DateCard from "./DateCard";
import NewCardSelector from "./NewCardSelector";
import spinner from "../img/loading.gif";
import { getVisibleDateCardsAndDenormalize } from "../selectors";

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
    const dateCards = (!this.props.isLoaded) ?
      (<img src={spinner} className="spinner" alt="Loading..." />) :
     this.props.dateCards.map((card) =>
       (<DateCard {...card} key={card.id} admin={this.props.admin || false} isDisabled={this.isLocked(this.props.cutoffDate, card.dateScheduled)} />)
     );

    const conditionalNewCardSelector = (this.props.admin && this.props.isLoaded) ? (<NewCardSelector />) : null;

    return (
      <div>
        <Menubar admin={this.props.admin} dateCards={this.props.dateCards}/>
        <div className="datecards">
          {dateCards}
        </div>
        {conditionalNewCardSelector}
      </div>
    );
  }
}

DateCards.propTypes = {
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
)(DateCards);

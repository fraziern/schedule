import React, { PropTypes } from "react";
import DateCard from "./DateCard";
import NewCardSelector from "./NewCardSelector";
import spinner from "../img/loading.gif";

function DateCards(props) {
  
  const mapCards = (card) =>
    (<DateCard {...card} key={card.id} admin={props.admin || false} isDisabled={!props.admin && (props.cutoffDate > card.dateScheduled)} />);

  const dateCards = (!props.isLoaded) ?
    (<img src={spinner} className="spinner" alt="Loading..." />) :
    props.dateCards.map(mapCards);

  const conditionalNewCardSelector = (props.admin && props.isLoaded) ? (<NewCardSelector />) : null;

  return (
    <div className="datecards-inner-container">
      <div className="datecards">
        {dateCards}
      </div>
      {conditionalNewCardSelector}
    </div>
  );
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

export default DateCards;

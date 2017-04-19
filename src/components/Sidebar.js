import React, { PropTypes } from "react";

function Sidebar(props) {
  const dates = (props.isLoaded) ? props.dateCards.map((card) =>
    (<h2 key={card.id}>{card.dateScheduled}</h2>)
  ) : null;
  return (
      <div className="sidebar">{dates}</div>
  );
}

Sidebar.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  dateCards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    dateScheduled: PropTypes.string.isRequired,
    slots: PropTypes.array.isRequired
  }))
};

export default Sidebar;

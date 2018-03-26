import PropTypes from 'prop-types';
import React from "react";

function FilterButton(props) {

  let buttonClass = "btn btn-default btn-sm" + ((props.filterStatus === props.filter) ? " active" : "");

  return (
      <button type="button" className={buttonClass} onClick={()=>props.onClick(props.filter)} >
        {props.label}
      </button>
  );
}

FilterButton.propTypes = {
  filter: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  filterStatus: PropTypes.string.isRequired
};

export default FilterButton;

import PropTypes from 'prop-types';
import React from "react";

function FilterRange(props) {
  return (
    <div className="form-inline">
      <label htmlFor="startDate">Show Dates From</label>
      <input id="startDate" type="text" onChange={props.handleStartChange} value={props.startValue} onKeyPress={props.handleStartSubmit}/>
      <label htmlFor="endDate">To</label>
      <input id="endDate" type="text" placeholder="end of time" onChange={props.handleStopChange} value={props.stopValue} onKeyPress={props.handleStopSubmit}/>
    </div>
  );
}

FilterRange.propTypes = {
  handleStartChange: PropTypes.func.isRequired,
  handleStopChange: PropTypes.func.isRequired,
  handleStartSubmit: PropTypes.func.isRequired,
  handleStopSubmit: PropTypes.func.isRequired,
  startValue: PropTypes.string.isRequired,
  stopValue: PropTypes.string
};

export default FilterRange;

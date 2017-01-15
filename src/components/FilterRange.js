import React, { Component, PropTypes } from "react";

class FilterRange extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="form-inline">
        <label htmlFor="startDate">Show Dates From</label>
        <input id="startDate" type="text" onChange={this.props.handleStartChange} value={this.props.startValue} onKeyPress={this.props.handleStartSubmit}/>
        <label htmlFor="endDate">To</label>
        <input id="endDate" type="text" placeholder="end of time" onChange={this.props.handleStopChange} value={this.props.stopValue} onKeyPress={this.props.handleStopSubmit}/>
      </div>
    );
  }
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

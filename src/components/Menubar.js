import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import FilterButton from "./FilterButton.js";
import FilterRange from "./FilterRange";
import { setFilter, setStartDate, setStopDate } from "../actions";
import moment from "moment";

class Menubar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(this.props.startDate).format("M/D/YYYY"),
      stopDate: ""
    };

    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleStopChange = this.handleStopChange.bind(this);
    this.handleStartSubmit = this.handleStartSubmit.bind(this);
    this.handleStopSubmit = this.handleStopSubmit.bind(this);
    this.setFilter = this.setFilter.bind(this);
  }

// TODO: DRY this up. Maybe a separate component 'FilterSelector' or something
  handleStartChange(e) {
    this.setState({startDate: e.target.value});
  }

  handleStopChange(e) {
    this.setState({stopDate: e.target.value});
  }

  handleStartSubmit(e) {
    if (e.which === 13) {
      this.props.dispatch(setStartDate(this.state.startDate));
    }
  }

  handleStopSubmit(e) {
    if (e.which === 13) {
      this.props.dispatch(setStopDate(this.state.stopDate));
    }
  }

  setFilter(filter) {
    this.props.dispatch(setFilter(filter));
  }

  render() {
    const filterRange = (this.props.admin) ? (
      <div className="filter-range">
        <FilterRange handleStartChange={this.handleStartChange}
          handleStopChange={this.handleStopChange}
          handleStartSubmit={this.handleStartSubmit}
          handleStopSubmit={this.handleStopSubmit}
          startValue={this.state.startDate}
          stopValue={this.state.stopDate}
          />
      </div>
    ) : null;

    return (
      <div className="menubar">
        <div className="filter-buttons">
          <FilterButton filter="ALL" label="Show All" onClick={this.setFilter} filterStatus={this.props.cardFilter}/>
          <FilterButton filter="VACANT" label="Vacant Only" onClick={this.setFilter} filterStatus={this.props.cardFilter}/>
        </div>
        {filterRange}
      </div>
    );
  }
}

Menubar.propTypes = {
  admin: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  startDate: PropTypes.string.isRequired,
  cardFilter: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    startDate: state.assignments.startDate,
    cardFilter: state.assignments.filter
  };
}

export default connect(mapStateToProps)(Menubar);

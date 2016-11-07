import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import FilterButton from "./FilterButton.js";
import { setFilter } from "../actions";

class Menubar extends Component {

  render() {
    return (
      <div className="menubar">
        <FilterButton filter="ALL" label="Show All" />
        <FilterButton filter="VACANT" label="Vacant Only"/>
      </div>
    );
  }
}

Menubar.propTypes = {
  setFilter: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    setFilter: (filter) => {
      dispatch(setFilter(filter));
    }
  };
}

export default connect(
  null,
  mapDispatchToProps
)(Menubar);

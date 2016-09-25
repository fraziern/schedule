import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { setFilter } from "../actions/index.js";

class FilterButton extends Component {

  render() {
    let buttonClass = "btn btn-default btn-sm" + ((this.props.active) ? " active" : "");

    return (
        <button type="button" className={buttonClass} onClick={this.props.onClick} >
          {this.props.label}
        </button>
    );
  }
}

FilterButton.PropTypes = {
  filter: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    active: ownProps.filter === state.filter
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onClick: () => {
      dispatch(setFilter(ownProps.filter));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterButton);

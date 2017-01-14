import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";

class FilterButton extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.onClick(this.props.filter);
  }

  render() {
    let buttonClass = "btn btn-default btn-sm" + ((this.props.active) ? " active" : "");

    return (
        <button type="button" className={buttonClass} onClick={this.handleClick} >
          {this.props.label}
        </button>
    );
  }
}

FilterButton.propTypes = {
  filter: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool,
  label: PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    active: ownProps.filter === state.assignments.filter
  };
}

export default connect(mapStateToProps)(FilterButton);

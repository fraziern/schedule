import React, { Component, PropTypes } from "react";

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
    let buttonClass = "btn btn-default btn-sm" + ((this.props.filterStatus === this.props.filter) ? " active" : "");

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
  label: PropTypes.string.isRequired,
  filterStatus: PropTypes.string.isRequired
};

export default FilterButton;

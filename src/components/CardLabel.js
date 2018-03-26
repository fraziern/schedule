import React, { Component } from "react";
import PropTypes from "prop-types";
import sanitize from "../utils/sanitize";
import checkmark from "../img/checkmark.svg";
import spinner from "../img/loading.gif";

class CardLabel extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputEnter = this.handleInputEnter.bind(this);
    this.state = {
      label: this.props.label ? this.props.label : ""
    };
  }

  // If editing is turned off, and label is changed, save label
  componentWillReceiveProps(nextProps) {
    if (
      this.props.editing &&
      !nextProps.editing &&
      this.state.label != this.props.label
    ) {
      this.props.handleUpdateLabel(this.state.label.trim());
    }
  }

  handleInputChange(e) {
    // forbid non-valid characters and limit length
    const cleanedValue = sanitize(e.target.value);
    this.setState({ label: cleanedValue });
  }

  // if we hit ENTER then send an update action
  // TODO: doesn't onSubmit event do this already?
  handleInputEnter(e) {
    if (e.which === 13) {
      this.props.handleUpdateLabel(this.state.label.trim());
    }
  }

  render() {
    const checkClass = this.props.labelSaved
      ? "checkmark"
      : "checkmark checkmark--hidden";
    const spinnerClass = this.props.labelSaving
      ? "spinner"
      : "spinner spinner--hidden";

    const switchingLabel = this.props.editing ? (
      <div className="cardlabel-container">
        <input
          className="form-control cardlabel--input"
          type="text"
          placeholder="Enter label"
          value={this.state.label}
          onChange={this.handleInputChange}
          onKeyPress={this.handleInputEnter}
        />
        <div className="cardlabel--check">
          <img src={checkmark} className={checkClass} alt="saved" />
          <img src={spinner} className={spinnerClass} alt="saving" />
        </div>
      </div>
    ) : (
      <p className="cardlabel">{this.state.label}</p>
    );

    return switchingLabel;
  }
}

CardLabel.propTypes = {
  editing: PropTypes.bool.isRequired,
  handleUpdateLabel: PropTypes.func.isRequired,
  labelSaving: PropTypes.bool,
  labelSaved: PropTypes.bool,
  label: PropTypes.string
};

export default CardLabel;

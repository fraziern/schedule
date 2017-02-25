import React, { Component, PropTypes } from "react";
import sanitize from "../utils/sanitize";

class CardLabel extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputEnter = this.handleInputEnter.bind(this);
    this.state = {
      label: (this.props.label) ? this.props.label : "",
    };
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

    const switchingLabel = (this.props.editing) ?
      (<input className="form-control cardlabel--input" type="text"
        placeholder="Enter label"
        value={this.state.label}
        onChange={this.handleInputChange}
        onKeyPress={this.handleInputEnter}
      />) : (<p className="cardlabel">{this.state.label}</p>);

    return switchingLabel;
  }
}

CardLabel.propTypes = {
  editing: PropTypes.bool.isRequired,
  handleUpdateLabel: PropTypes.func.isRequired,
  label: PropTypes.string
};

export default CardLabel;

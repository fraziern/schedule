import React, { Component, PropTypes } from "react";

class CardLabel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: (this.props.label) ? this.props.label : "",
    };
  }

  handleInputChange(e) {
    this.setState({ label: e.target.value });
  }

  render() {

    const switchingLabel = (this.props.editing) ?
      (<input className="form-control cardlabel--input" type="text"
        placeholder="Enter label"
        value={this.state.label}
        onChange={this.handleInputChange}
      />) : (<p className="cardlabel">{this.state.label}</p>);

    return switchingLabel;
  }
}

CardLabel.PropTypes = {
  handleAddSlot: PropTypes.func.isRequired,
};

export default CardLabel;

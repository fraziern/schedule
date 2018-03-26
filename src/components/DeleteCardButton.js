import PropTypes from 'prop-types';
import React, { Component } from "react";

class DeleteCardButton extends Component {
  constructor(props) {
    super(props);
    this.state = { armed: false };
    this.handleButton = this.handleButton.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleButton(e) {
    e.preventDefault();
    if (this.state.armed) this.props.handleDeleteCard();
    else this.setState( {armed: true });
  }

  handleBlur() {
    this.setState( { armed: false });
  }

  render() {
    let buttonClassBase = "glyphicon glyphicon-trash";
    let buttonClassArmed = (this.state.armed) ? " glyphicon-trash--armed" : "";
    let trashcanClass = buttonClassBase + buttonClassArmed;

    return (
      <span><button className={trashcanClass} onClick={this.handleButton} onBlur={this.handleBlur}>
      </button> </span>
    );
  }
}

DeleteCardButton.PropTypes = {
  handleDeleteCard: PropTypes.func.isRequired
};

export default DeleteCardButton;

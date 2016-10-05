import React, { Component, PropTypes } from "react";

class DeleteSlotButton extends Component {
  render() {
    let buttonClass = (this.props.editing) ? "remove-slot-btn" : "remove-slot-btn remove-slot-btn--hidden";

    return (
      <td className={buttonClass}><button onClick={this.props.handleDeleteSlotButton} hidden={!this.props.editing} tabIndex={this.props.editing ? 0 : -1} type="button" className="btn btn-default btn-sm btn-danger">X</button></td>
    );
  }
}

DeleteSlotButton.PropTypes = {
  handleDeleteSlotButton: PropTypes.func.isRequired
};

export default DeleteSlotButton;

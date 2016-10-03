import React, { Component, PropTypes } from "react";

class DeleteSlotButton extends Component {
  render() {
    let buttonClass = (this.props.editing) ? "remove-slot-btn" : "remove-slot-btn remove-slot-btn--hidden";

    return (
      <td className={buttonClass}><button onClick={this.props.handleDeleteSlotButton} type="button" className="btn btn-default btn-sm btn-danger">X</button></td>
    );
  }
}

DeleteSlotButton.PropTypes = {
  handleDeleteSlotButton: PropTypes.func.isRequired
};

export default DeleteSlotButton;

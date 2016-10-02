import React, { Component, PropTypes } from "react";

class DeleteSlotButton extends Component {
  render() {
    return (
      <td className="remove-slot-btn"><button onClick={this.props.handleDeleteSlotButton} type="button" className="btn btn-default btn-sm btn-danger">X</button></td>
    );
  }
}

DeleteSlotButton.PropTypes = {
  handleDeleteSlotButton: PropTypes.func.isRequired
};

export default DeleteSlotButton;

import React, { PropTypes } from "react";

function DeleteSlotButton(props) {
  let buttonClass = (props.editing) ? "remove-slot-btn" : "remove-slot-btn remove-slot-btn--hidden";

  return (
    <td className={buttonClass}><button onClick={props.handleDeleteSlotButton} hidden={!props.editing} tabIndex={props.editing ? 0 : -1} type="button" className="btn btn-default btn-sm btn-danger">X</button></td>
  );
}

DeleteSlotButton.propTypes = {
  handleDeleteSlotButton: PropTypes.func.isRequired,
  editing: PropTypes.bool.isRequired
};

export default DeleteSlotButton;

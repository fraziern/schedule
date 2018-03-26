import PropTypes from 'prop-types';
import React from "react";

function Selector(props) {
  const className = (props.selectorValue === "") ? "form-control selector selector-empty" : "form-control selector";

  return (
      <input className={className} ref={props.registerInput} type="text" name={props.assignmentName} disabled={props.isDisabled} value={props.selectorValue} onChange={props.handleSelectorChange} onFocus={props.handleSelectorFocus}
      onBlur={props.handleSelectorBlur} onKeyPress={props.handleSelectorEnter}
      />

  );
}

Selector.propTypes = {
  selectorValue: PropTypes.string.isRequired,
  assignmentName: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  handleSelectorChange: PropTypes.func.isRequired,
  handleSelectorFocus: PropTypes.func.isRequired,
  handleSelectorBlur: PropTypes.func.isRequired,
  handleSelectorEnter: PropTypes.func.isRequired,
  registerInput: PropTypes.func.isRequired
};

export default Selector;

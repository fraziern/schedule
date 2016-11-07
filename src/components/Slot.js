import React, { Component, PropTypes } from "react";
import Selector from "./Selector";
import DeleteSlotButton from "./DeleteSlotButton";
import checkmark from "../img/checkmark.svg";
import spinner from "../img/loading.gif";

class Slot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectorValue: (this.props.assignee) ? this.props.assignee.name : "",
      focused: false,
      changed: false
    };
    this.handleSelectorChange = this.handleSelectorChange.bind(this);
    this.handleSelectorFocus = this.handleSelectorFocus.bind(this);
    this.handleSelectorBlur = this.handleSelectorBlur.bind(this);
    this.handleSelectorEnter = this.handleSelectorEnter.bind(this);
    this.handleDeleteSlotButton = this.handleDeleteSlotButton.bind(this);
  }

  handleDeleteSlotButton(e) {
    e.preventDefault();
    this.props.handleDeleteSlot(this.props.id);
  }

  handleSelectorChange(e) {
    this.setState({ selectorValue: e.target.value });
    if (!this.state.changed) this.setState({ changed: true });
    if(this.props.saved) this.props.handleChangesIfNeeded(this.props.id);
  }

  // These handlers are used to alter CSS
  handleSelectorFocus() {
    this.setState({ focused: true });
  }

  handleSelectorBlur() {
    this.setState({ focused: false });
    if (this.state.changed) this.props.handleUpdateAssignment(this.props.id, this.state.selectorValue.trim());
  }

  // if we hit ENTER then send an update action
  handleSelectorEnter(e) {
    if (e.which === 13) {
      this.props.handleUpdateAssignment(this.props.id, this.state.selectorValue.trim());
    }
  }

  render() {
    const checkClass = this.props.saved ? "checkmark" : "checkmark checkmark--hidden";
    const labelClass = this.state.focused ? "slotlabel label--focused" : "slotlabel";
    const rowClass = (this.state.selectorValue === "") ? "slot danger" : "slot";
    const spinnerClass = this.props.isSaving ? "spinner" : "spinner spinner--hidden";

    return (
      <tr className={rowClass}>
          {this.props.admin ? <DeleteSlotButton handleDeleteSlotButton={this.handleDeleteSlotButton} editing={this.props.editing} /> : null}
          <td>
            <h4 className={labelClass}>{this.props.assignment.name}</h4>
          </td>
          <td>
            <Selector assignmentName={this.props.assignment.name}
            selectorValue={this.state.selectorValue}
            handleSelectorChange={this.handleSelectorChange}
            handleSelectorFocus={this.handleSelectorFocus}
            handleSelectorBlur={this.handleSelectorBlur}
            handleSelectorEnter={this.handleSelectorEnter}
            isDisabled={this.props.isDisabled} />
          </td>
          <td>
            <img src={checkmark} className={checkClass} alt="saved" />
            <img src={spinner} className={spinnerClass} alt="saving" />
          </td>
      </tr>
    );
  }
}

Slot.propTypes = {
  handleChangesIfNeeded: PropTypes.func.isRequired,
  assignee: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string
  }).isRequired,
  handleDeleteSlot: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  saved: PropTypes.bool,
  handleUpdateAssignment: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
  admin: PropTypes.bool.isRequired,
  editing: PropTypes.bool.isRequired,
  assignment: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string
  }).isRequired,
  isDisabled: PropTypes.bool
};

export default Slot;

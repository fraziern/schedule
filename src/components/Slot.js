import React, { Component } from "react";
import Selector from "./Selector";
import checkmark from "../../checkmark.svg";

class Slot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectorValue: (this.props.assignee) ? this.props.assignee.name : "",
      focused: false
    };
    this.handleSelectorChange = this.handleSelectorChange.bind(this);
    this.handleSelectorFocus = this.handleSelectorFocus.bind(this);
    this.handleSelectorBlur = this.handleSelectorBlur.bind(this);
    this.handleSelectorEnter = this.handleSelectorEnter.bind(this);
  }

  handleSelectorChange(e) {
    this.setState({ selectorValue: e.target.value });
    if(this.props.saved) this.props.handleChangesIfNeeded(this.props.id);
  }

  // These handlers are used to alter CSS
  handleSelectorFocus(e) {
    this.setState({ focused: true });
  }

  handleSelectorBlur(e) {
    this.setState({ focused: false });
  }

  // if we hit ENTER then send an update action
  handleSelectorEnter(e) {
    if (e.charCode === 13) {
      this.props.handleUpdateAssignment(this.props.id, this.state.selectorValue);
    }
  }

  render() {
    const checkClass = (this.props.saved) ? "checkmark" : "checkmark checkmark--hidden";
    const labelClass = (this.state.focused) ? "slotlabel label--focused" : "slotlabel";
    const rowClass = (this.state.selectorValue === "") ? "danger" : "";

    return (
      <tr className={rowClass}>
          <td><h4 className={labelClass}>{this.props.assignment.name}</h4></td>
          <td><Selector {...this.props} selectorValue={this.state.selectorValue} handleSelectorChange={this.handleSelectorChange}
              handleSelectorFocus={this.handleSelectorFocus}
              handleSelectorBlur={this.handleSelectorBlur}
              handleSelectorEnter={this.handleSelectorEnter}
               cardDisabled={this.props.cardDisabled} /></td>
          <td><img src={checkmark} className={checkClass} alt="saved" /></td>
      </tr>
    );
  }
}

export default Slot;

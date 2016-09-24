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
    this.props.handleChangesIfNeeded(this.props.id);
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
    const nameClass = (this.state.focused) ? "assignment-name assignment-name--focused" : "assignment-name";
    const checkClass = (this.props.saved) ? "checkmark" : "checkmark checkmark--hidden";

    return (
      <li>
        <h3 className={nameClass}>{this.props.assignment.name}</h3>
        <img src={checkmark} className={checkClass} alt="saved" />
        <Selector {...this.props} selectorValue={this.state.selectorValue} handleSelectorChange={this.handleSelectorChange}
        handleSelectorFocus={this.handleSelectorFocus}
        handleSelectorBlur={this.handleSelectorBlur}
        handleSelectorEnter={this.handleSelectorEnter}
         cardDisabled={this.props.cardDisabled} />
      </li>
    );
  }
}

export default Slot;

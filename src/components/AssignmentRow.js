import React, { Component } from "react";
import Selector from "./Selector";

class AssignmentRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectorValue: this.props.assignee,
      focused: false
    };
    this.handleSelectorChange = this.handleSelectorChange.bind(this);
    this.handleSelectorFocus = this.handleSelectorFocus.bind(this);
    this.handleSelectorBlur = this.handleSelectorBlur.bind(this);
  }

  handleSelectorChange(e) {
    this.setState({ selectorValue: e.target.value });
    this.props.handleChangesIfNeeded();
  }

  // These handlers are used to alter CSS
  handleSelectorFocus(e) {
    this.setState({ focused: true });
  }

  handleSelectorBlur(e) {
    this.setState({ focused: false });
  }

  render() {
    const className = (this.state.focused) ? "assignment-name assignment-name--focused" : "assignment-name";

    return (
      <li>
        <h3 className={className}>{this.props.assignment}</h3>
        <Selector {...this.props} selectorValue={this.state.selectorValue} handleSelectorChange={this.handleSelectorChange}
        handleSelectorFocus={this.handleSelectorFocus}
        handleSelectorBlur={this.handleSelectorBlur}
         cardDisabled={this.props.cardDisabled} />
      </li>
    );
  }
}

export default AssignmentRow;

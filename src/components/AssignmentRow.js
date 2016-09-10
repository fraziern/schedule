import React, { Component } from "react";
import Selector from "./Selector";

class AssignmentRow extends Component {
  constructor(props) {
    super(props);
    this.state = { selectorValue: this.props.assignee };
    this.handleSelectorChange = this.handleSelectorChange.bind(this);
  }

  handleSelectorChange(e) {
    this.setState({ selectorValue: e.target.value });
  }

  render() {
    return (
      <li>
        <p className="assignment-name">{this.props.assignment}</p>
        <Selector {...this.props} selectorValue={this.state.selectorValue} handleSelectorChange={this.handleSelectorChange} cardDisabled={this.props.cardDisabled} />
      </li>
    );
  }
}

export default AssignmentRow;

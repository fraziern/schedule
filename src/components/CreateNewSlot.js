import React, { Component, PropTypes } from "react";

class CreateNewSlot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectorValue: (this.props.assignee) ? this.props.assignee.name : "",
      // focused: false
    };
    this.handleSelectorChange = this.handleSelectorChange.bind(this);
    this.handleSelectorEnter = this.handleSelectorEnter.bind(this);
  }

  handleSelectorChange(e) {
    // forbid non-valid characters and limit length
    const cleanedValue = e.target.value.slice(0,80).replace(/[^A-Za-z\.\s\&']/g,"");
    this.setState({ selectorValue: cleanedValue });
  }

  // if we hit ENTER then send an update action
  handleSelectorEnter(e) {
    if (e.which === 13) {
      const text = e.target.value.trim();
      this.props.handleAddSlot(text);
      this.setState({ selectorValue: "" });
    }
  }

  render() {

    return (
      <tr className="create-new-slot">
          <td></td>
          <td>
            <input className="form-control selector" type="text"
              placeholder="Enter new assignment"
              value={this.state.selectorValue}
              onChange={this.handleSelectorChange}
              onKeyPress={this.handleSelectorEnter}
            />
          </td>
          <td></td>
          <td></td>
      </tr>
    );
  }
}

CreateNewSlot.propTypes = {
  handleAddSlot: PropTypes.func.isRequired,
  assignee: PropTypes.string
};

export default CreateNewSlot;

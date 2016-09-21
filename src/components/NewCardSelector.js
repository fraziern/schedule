import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { addDateCard } from "../actions";

class NewCardSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectorValue: ""
    };
    this.handleSelectorChange = this.handleSelectorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSelectorChange(e) {
    this.setState({ selectorValue: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addDateCard(this.state.selectorValue);  // TODO: validate date value
    this.setState({ selectorValue: "" });
  }

  render() {
    return (
      <div className="date-card" >
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Enter new date" value={this.state.selectorValue} onChange={this.handleSelectorChange} />
          <button type="submit">+</button>
        </form>
      </div>
    );
  }
}

NewCardSelector.PropTypes = {
  addDateCard: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    addDateCard: (newDate) => {
      dispatch(addDateCard(newDate));
    }
  };
}

export default connect(
  null,
  mapDispatchToProps
)(NewCardSelector);

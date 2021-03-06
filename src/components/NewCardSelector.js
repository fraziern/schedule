import PropTypes from 'prop-types';
import React, { Component } from "react";
import { connect } from "react-redux";
import { addDateCard } from "../actions";
import sanitize from "../utils/sanitize";

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
    // forbid non-valid characters and limit length
    const cleanedValue = sanitize(e.target.value);
    this.setState({ selectorValue: cleanedValue });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addDateCard(this.state.selectorValue);  // TODO: validate date value
    this.setState({ selectorValue: "" });
  }

  render() {
    return (
      <div className="datecard panel panel-default" >
        <form onSubmit={this.handleSubmit}>
          <input className="form-control selector" type="text" placeholder="Add new date (m/d/yy)" value={this.state.selectorValue} onChange={this.handleSelectorChange} />
        </form>
      </div>
    );
  }
}

NewCardSelector.propTypes = {
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

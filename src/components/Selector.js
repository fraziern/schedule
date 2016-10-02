import React, { Component } from "react";

class Selector extends Component {
  render() {
    const className = (this.props.selectorValue === "") ? "form-control selector selector-empty" : "form-control selector";

    return (

        <input className={className} type="text" name={this.props.assignmentName} disabled={this.props.isDisabled} value={this.props.selectorValue} onChange={this.props.handleSelectorChange} onFocus={this.props.handleSelectorFocus}
        onBlur={this.props.handleSelectorBlur} onKeyPress={this.props.handleSelectorEnter}
        />

    );
  }
}

export default Selector;

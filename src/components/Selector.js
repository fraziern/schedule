import React, { Component } from "react";

class Selector extends Component {
  render() {
    const className = (this.props.selectorValue === "") ? "selector selector-empty" : "selector";

    return (
      <input className={className} type="text" name={this.props.assignment} disabled={this.props.cardDisabled} value={this.props.selectorValue} onChange={this.props.handleSelectorChange} onFocus={this.props.handleSelectorFocus}
      onBlur={this.props.handleSelectorBlur} onKeyPress={this.props.handleSelectorEnter}
      />);
  }
}

export default Selector;

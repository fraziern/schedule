import React, { Component } from "react";

class Header extends Component {

  render() {

    return (
      // TODO: get rid of some of this nesting
      <div>
        <div className="container header">
          <h1>Volunteer Schedule <small>Raleigh Moravian Church</small></h1>
        </div>
        <div className="container">
          {this.props.children}
        </div>
        <div className="footer">
        </div>
      </div>
    );
  }
}

export default Header;

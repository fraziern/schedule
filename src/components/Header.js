import React, { Component } from "react";
import Menubar from "./Menubar";

class Header extends Component {

  render() {

    return (
      // TODO: get rid of some of this nesting
      <div className="container">
        <div className="header">
          <h1>Volunteer Schedule <small>Raleigh Moravian Church</small></h1>
        </div>
        <Menubar />
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Header;

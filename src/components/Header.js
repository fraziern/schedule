import React, { Component } from "react";

class Header extends Component {

  render() {

    return (
      // TODO: get rid of some of this nesting
      <div>
      <div className="App-header">
        <div className="header-container">
          <div className="title-container">
            <h1 className="card-date">Volunteer Scheduler</h1>
          </div>
        </div>
      </div>
      {this.props.children}
      </div>
    );
  }
}

export default Header;

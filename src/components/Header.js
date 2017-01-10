import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";

class Header extends Component {

  render() {

    const userinfo = (this.props.loggedInUser) ?
      (<div className="userinfo">
        Currently logged in as {this.props.loggedInUser.user.username}.
        <span className="logout-link"><a href="#" onClick={() => console.log("logging out")}>Logout</a></span>
      </div>) :
      null;

    return (
      <div>
        {userinfo}
        <div className="container">
          <div className="header">
            <h1>Volunteer Schedule <small>Raleigh Moravian Church</small></h1>
          </div>
          <div>
            {this.props.children}
          </div>
        </div>
    </div>
    );
  }
}

Header.propTypes = {
  children: PropTypes.element,
  loggedInUser: PropTypes.object
};

function mapStateToProps(state) {
  return {
    loggedInUser: state.userinfo.loggedInUser
  };
}

export default connect(mapStateToProps)(Header);

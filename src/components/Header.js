import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { navigateTo } from "../actions";

class Header extends Component {

  componentDidUpdate(prevProps) {
    const isLogginIn = !prevProps.loggedInUser && this.props.loggedInUser;

    if (isLoggingIn) {
      this.props.dispatch(navigateTo(this.props.redirectUrl));
    }
  }

  render() {

    // login info - saving this for later

    // const userinfo = (this.props.loggedInUser) ?
    //   (<div className="userinfo">
    //     Currently logged in as {this.props.loggedInUser.user.username}.
    //     <span className="logout-link"><a href="#" onClick={() => console.log("logging out")}>Logout</a></span>
    //   </div>) :
    //   null;

    return (
      <div>
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
  loggedInUser: PropTypes.object,
  redirectUrl: PropTypes.object
};

function mapStateToProps(state) {
  return {
    loggedInUser: state.userinfo.loggedInUser,
    redirectUrl: state.userinfo.redirectUrl
  };
}

export default connect(mapStateToProps)(Header);

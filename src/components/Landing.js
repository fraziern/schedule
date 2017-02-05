import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { login } from "../actions";
import { browserHistory } from "react-router";

class Landing extends Component {

  constructor(props) {
    super(props);
    this.handleOK = this.handleOK.bind(this);
  }

  componentDidUpdate() {
    if (this.props.loggedInUser) {
      browserHistory.push("/");
    }
  }

  handleOK(e) {
    e.preventDefault();
    this.props.handleLogin("admin", "rmcadmin", this.props.location);
  }

  render() {

    return (
        <div>
          <p>Click OK to continue.</p>
            <button onClick={this.handleOK}>OK</button>
        </div>
    );
  }
}

Landing.propTypes = {
  location: PropTypes.object.isRequired,
  loggedInUser: PropTypes.object,
  loginError: PropTypes.bool,
  handleLogin: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    loggedInUser: state.userinfo.loggedInUser
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleLogin: (username, password, location) => {
      dispatch(login(username, password, location));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);

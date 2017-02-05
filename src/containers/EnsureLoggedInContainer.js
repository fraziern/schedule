import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { setRedirectUrl } from "../actions";
import { browserHistory } from "react-router";

class EnsureLoggedInContainer extends Component {
  componentDidMount() {
    const { location, loggedInUser } = this.props;

    if (!loggedInUser) {
      // set the current url/path for future redirection (we use a Redux action)
      // then redirect (we use a React Router method)
      this.props.setRedirectUrl(location);
      browserHistory.replace("/");
    }
  }

  render() {
    if (this.props.loggedInUser) {
      return this.props.children;
    } else {
      return null;
    }
  }
}

EnsureLoggedInContainer.propTypes = {
  location: PropTypes.object.isRequired,
  loggedInUser: PropTypes.object,
  setRedirectUrl: PropTypes.func.isRequired,
  children: PropTypes.element
};

function mapStateToProps(state, ownProps) {
  return {
    loggedInUser: state.userinfo.loggedInUser,
    location: ownProps.location.pathname
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setRedirectUrl: (url) => {
      dispatch(setRedirectUrl(url));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EnsureLoggedInContainer);

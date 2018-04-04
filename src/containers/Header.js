import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import DateCardsContainer from "./DateCardsContainer";
import DateCardsContainerAdmin from "./DateCardsContainerAdmin";
import Login from "../components/Login";
import Reports from "./Reports";
import ErrorBar from "../components/ErrorBar";

function Header(props) {
  const { loggedInUser, errors } = props;

  const errorbar = errors.length > 0 && <ErrorBar errors={errors} />;

  const userinfo = null;
  // ** Authentication implementation code **
  // const userinfo = loggedInUser ? (
  //   <div className="userinfo">
  //     Currently logged in as {loggedInUser.user.username}.
  //     <span className="logout-link">
  //       <a href="#" onClick={() => console.log("logging out")}>
  //         Logout
  //       </a>
  //     </span>
  //   </div>
  // ) : null;

  return (
    <div>
      {errorbar}
      {userinfo}
      <div className="container">
        <div className="header">
          <h1>
            Volunteer Schedule <small>Raleigh Moravian Church</small>
          </h1>
        </div>
        <div className="header-children">
          <Switch>
            <Route exact path="/" component={DateCardsContainer} />
            <Route path="/admin" component={DateCardsContainerAdmin} />
            <Route path="/login" component={Login} />
            <Route path="/reports" component={Reports} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  children: PropTypes.element,
  loggedInUser: PropTypes.object,
  errors: PropTypes.array
};

function mapStateToProps(state) {
  return {
    loggedInUser: state.userinfo.loggedInUser,
    errors: state.errors.errors
  };
}

export default connect(mapStateToProps)(Header);

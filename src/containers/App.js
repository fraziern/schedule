import React, { Component } from "react";
import { Router, Route, browserHistory } from "react-router";
import DateCards from "../components/DateCards";
import DateCardsAdmin from "../components/DateCardsAdmin";
import Login from "../components/Login";
import Header from "../components/Header";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createLogger from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "../reducers";
import { loadAllCards, checkServerLogin } from "../actions/index.js";
import { syncHistoryWithStore, routerMiddleware } from "react-router-redux";

class App extends Component {

  constructor(props) {
    super(props);

    let middleware = [ thunk ];
    if (process.env.NODE_ENV !== "production") {
      middleware.push(createLogger());
    }

    this.store = createStore(
      rootReducer,
      applyMiddleware(...middleware)
    );

    this.history = browserHistory;

    this.store.dispatch(checkServerLogin());

    this.loggedIn = this.loggedIn.bind(this);
    this.requireAuth = this.requireAuth.bind(this);
  }

  componentWillMount() {
    this.store.dispatch(loadAllCards());
  }

  loggedIn() {
    const state = this.store.getState();
    return state.userinfo.loggedInUser;
  }

  requireAuth(nextState, replace) {
    if (!this.loggedIn()) {
      replace({
        pathname: "/login",
        state: { nextPathname: nextState.location.pathname }
      });
    }
  }

  render() {
    return (
      <Provider store={this.store}>
        <Router history={this.history}>
          <Route component={Header} >
            <Route path="/" component={DateCards} />
            <Route path="admin" component={DateCardsAdmin} onEnter={this.requireAuth}/>
            <Route path="login" component={Login} />
          </Route>
        </Router>
      </Provider>
    );
  }
}

export default App;

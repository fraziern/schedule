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
import { loadAllCards } from "../actions/index.js";

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
  }

  componentWillMount() {
    this.store.dispatch(loadAllCards());
  }

  render() {
    return (
      <Provider store={this.store}>
        <Router history={browserHistory}>
          <Route component={Header} >
            <Route path="/" component={DateCards} />
            <Route path="admin" component={DateCardsAdmin} />
            <Route path="login" component={Login} />
          </Route>
        </Router>
      </Provider>
    );
  }
}

export default App;

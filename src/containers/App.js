import React, { Component } from "react";
import { Router, Route, browserHistory } from "react-router";
import DateCardsContainer from "./DateCardsContainer";
import DateCardsContainerAdmin from "./DateCardsContainerAdmin";
import Login from "../components/Login";
import Header from "../components/Header";
import loadReports from "bundle-loader?lazy!../components/Reports";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createLogger from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "../reducers";
import { loadAllCards } from "../actions/index.js";
import Bundle from "./Bundle";

const Reports = () => (
  <Bundle load={loadReports}>
    {(Reports) => Reports ? <Reports/> : <div>Loading</div>}
  </Bundle>
);

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
            <Route path="/" component={DateCardsContainer} />
            <Route path="admin" component={DateCardsContainerAdmin} />
            <Route path="login" component={Login} />
            <Route path="reports" component={Reports} />
          </Route>
        </Router>
      </Provider>
    );
  }
}

export default App;

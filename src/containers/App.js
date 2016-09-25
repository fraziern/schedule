import React, { Component } from "react";
import { Router, Route, browserHistory } from "react-router";
import DateCards from "../components/DateCards";
import DateCardsAdmin from "../components/DateCardsAdmin";
import Header from "../components/Header";

class App extends Component {
  render() {
    return (
      <div>
        <Router history={browserHistory}>
          <Route component={Header} >
            <Route path="/" component={DateCards} />
            <Route path="admin" component={DateCardsAdmin} />
          </Route>
        </Router>
      </div>
    );
  }
}

export default App;

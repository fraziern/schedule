import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createLogger from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "../reducers";
import { loadAllCards } from "../actions/index.js";

class App extends Component {
  constructor(props) {
    super(props);

    let middleware = [thunk];
    if (process.env.NODE_ENV !== "production") {
      middleware.push(createLogger());
    }

    this.store = createStore(rootReducer, applyMiddleware(...middleware));
  }

  componentWillMount() {
    this.store.dispatch(loadAllCards());
  }

  render() {
    return (
      <Provider store={this.store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;

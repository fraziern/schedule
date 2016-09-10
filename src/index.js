import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createLogger from "redux-logger";
import thunk from "redux-thunk";
import assignments from "./reducers/assignments.js";
import { getAllCards } from "./actions/index.js";
import App from "./containers/App";
import "./index.css";

// const middleware = [ thunk ];
// if (process.env.NODE_ENV !== "production") {
//   middleware.push(createLogger());
// }
//
// const store = createStore(
//   assignments,
//   applyMiddleware(...middleware)
// );
//
// store.dispatch(getAllCards());

render(
  <App />,
  document.getElementById("root")
);

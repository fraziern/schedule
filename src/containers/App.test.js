import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import assignments from "../reducers/assignments.js";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const store = createStore(assignments);
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>, div);
});

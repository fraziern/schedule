import { routerReducer as routing } from "react-router-redux";
import { combineReducers } from "redux";
import assignments from "./assignments.js";

const rootReducer = combineReducers({
  assignments,
  routing
});

export default rootReducer;

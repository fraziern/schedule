import { combineReducers } from "redux";
import assignments from "./assignments.js";
import userinfo from "./userinfo.js";
import reports from "./reports.js";

const rootReducer = combineReducers({
  assignments,
  userinfo,
  reports
});

export default rootReducer;

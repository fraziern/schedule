import { combineReducers } from "redux";
import assignments from "./assignments";
import userinfo from "./userinfo";
import reports from "./reports";
import errors from "./errors";

const rootReducer = combineReducers({
  assignments,
  userinfo,
  reports,
  errors
});

export default rootReducer;

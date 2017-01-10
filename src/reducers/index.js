import { combineReducers } from "redux";
import assignments from "./assignments.js";
import userinfo from "./userinfo.js";

const rootReducer = combineReducers({
  assignments,
  userinfo
});

export default rootReducer;

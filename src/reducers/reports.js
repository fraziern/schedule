import * as types from "../constants/ActionTypes.js";
// TODO: use immutability-helper instead of react-addons-update
// import update from "react-addons-update";

const initialState = {
  reportFilter: "Year",
};

// *** private helper functions ***

function changeReportFilter(state, filter) {
  return {...state,
    reportFilter: filter
  };
}

// ***
// EVERYTHING BELOW IS PUBLIC
// ***

// *** main reducer ***
export default function reports(state = initialState, action) {
  switch (action.type) {

  case types.UPDATE_REPORT_FILTER:
    return changeReportFilter(
      state,
      action.filter
    );

  default:
    return state;
  }
}

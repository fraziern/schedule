import * as types from "../constants/ActionTypes.js";

const initialState = {
  reportFilter: "Year"
};

// *** private helper functions ***

function changeReportFilter(state, filter) {
  return {
    ...state,
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
      return changeReportFilter(state, action.filter);

    default:
      return state;
  }
}

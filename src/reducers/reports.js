import * as types from "../constants/ActionTypes.js";
// TODO: use immutability-helper instead of react-addons-update
// import update from "react-addons-update";

const initialState = {
  assigneeSignupFilter: "Year",
};

// *** private helper functions ***

function changeAssigneeSignupFilter(state, filter) {
  return {...state,
    assigneeSignupFilter: filter
  };
}

// ***
// EVERYTHING BELOW IS PUBLIC
// ***

// *** main reducer ***
export default function reports(state = initialState, action) {
  switch (action.type) {

  case types.UPDATE_SIGNUP_FILTER:
    return changeAssigneeSignupFilter(
      state,
      action.filter
    );

  default:
    return state;
  }
}

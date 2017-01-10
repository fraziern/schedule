import * as types from "../constants/ActionTypes.js";
// TODO: use immutability-helper instead of react-addons-update
// import update from "react-addons-update";

const initialState = {
  loggedInUser: null,
  loginError: null
};

// *** private helper functions ***

function receiveUser(state, user) {
  return {...state, loggedInUser: user};
}

function dropUser(state) {
  return {...state, loggedInUser: null};
}

// ***
// EVERYTHING BELOW IS PUBLIC
// ***

// *** main reducer ***
export default function userinfo(state = initialState, action) {
  switch (action.type) {

  case types.RECEIVE_USER:
    return receiveUser(
      state,
      action.user
    );

  case types.DROP_USER:
    return dropUser(state);

  default:
    return state;
  }
}

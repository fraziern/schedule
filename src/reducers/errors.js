import * as types from "../constants/ActionTypes.js";
import update from "immutability-helper";

const initialState = {
  errors: []
};

// *** private helper functions ***

function addError(state, message, error) {
  let newError = {
    error,
    message
  };

  return update(state, {
    errors: { $push: [newError] }
  });
}

function clearErrors(state) {
  return { ...state, errors: [] };
}

// ***
// EVERYTHING BELOW IS PUBLIC
// ***

// *** main reducer ***
export default function errors(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_ERROR:
      return addError(state, action.message, action.error);

    case types.CLEAR_ERRORS:
      return clearErrors(state);

    default:
      return state;
  }
}

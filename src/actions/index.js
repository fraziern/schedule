import fetchApi from "../api/fetchApi.js";
import * as types from "../constants/ActionTypes.js";

function receiveCards(cards) {
  return {
    type: types.RECEIVE_ALLCARDS,
    dateCards: cards
  };
}

export function getAllCards() {
  return dispatch => {
    fetchApi.getAllCards(cards => {
      dispatch(receiveCards(cards.dateCards));
    });
  };
}

export function unsavedChanges() {
  return {
    type: types.UNSAVED_CHANGES
  };
}

export function updateAssignee(id, assignee) {
  return dispatch => {
    dispatch({
      type: types.UPDATE_ASSIGNMENT,
      id,
      assignee
    });
    fetchApi.updateAssignee(status => {
      dispatch({
        type: types.UPDATE_ASSIGNMENT_SUCCESS
      });
    });
  };
}

// for rollback on failure see https://github.com/reactjs/redux/blob/master/examples/shopping-cart/src/actions/index.js

import fetchApi from "../api/fetchApi.js";
import * as types from "../constants/ActionTypes.js";

function receiveCards(cards) {
  return {
    type: types.RECEIVE_ALLCARDS,
    dateCards: cards
  };
}

export function loadAllCards() {
  return dispatch => {
    fetchApi.getAllCards(cards => {
      dispatch(receiveCards(cards));
    });
  };
}

export function unsavedChanges() {
  return {
    type: types.UNSAVED_CHANGES
  };
}

export function addDateCard(newDate) {  // TODO: this needs to send AJAX too
  return {
    type: types.ADD_DATECARD,
    newDate
  };
}

export function updateAssignment(id, assignee) {
  return dispatch => {
    dispatch({
      type: types.UPDATE_ASSIGNMENT,
      id,
      assignee
    });
    // TODO: This needs to send AJAX too
    // fetchApi.updateAssignment(status => {
    //   dispatch({
    //     type: types.UPDATE_ASSIGNMENT_SUCCESS
    //   });
    // });
  };
}

// for rollback on failure see https://github.com/reactjs/redux/blob/master/examples/shopping-cart/src/actions/index.js

import fetchApi from "../api/fetchApi.js";
import * as types from "../constants/ActionTypes.js";
import uuid from "uuid";

function receiveCards(cards) {
  return {
    type: types.RECEIVE_ALLCARDS,
    dateCards: cards
  };
}

function addCardSuccess(card) {
  return {
    type: types.ADD_DATECARD,
    card
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
  // build dateCard
  return (dispatch, getState) => {
    // for now we'll change the date format "m/d/yyyy" to ISO w/o validating
    const dateScheduled = new Date(newDate);
    let state = getState();

    // create a set of new slots based on existing assignments list
    var newSlots = Object.keys(state.entities.assignments).map((assignmentId) => {
      const newSlotId = uuid.v4();
      return {
        _id: newSlotId,
        assignment: {
          id: assignmentId,
          name: state.entities.assignments[assignmentId].name
        },
        assignee: {
          id: "",
          name: ""
        }
      };
    });

    // create new dateCard
    let newDateCard = {
      _id: uuid.v4(),
      dateScheduled,
      slots: newSlots
    };

    fetchApi.addCard(newDateCard, function (card) {
      return dispatch(addCardSuccess(card));
    });
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

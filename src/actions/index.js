// *** ACTIONS *** //
import fetchApi from "../api/fetchApi.js";
import * as types from "../constants/ActionTypes.js";
import * as fromAccessors from "../reducers/accessors.js";
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

function updateAssigneeSuccess(id, assignee) {
  return {
    type: types.UPDATE_ASSIGNEE,
    id,
    assignee
  };
}

export function loadAllCards() {
  return dispatch => {
    fetchApi.getAllCards(cards => {
      dispatch(receiveCards(cards));
    });
  };
}

export function markUnsaved(id) {
  return {
    type: types.MARK_UNSAVED,
    id
  };
}

export function addDateCard(newDate) {
  return (dispatch, getState) => {
    // for now we'll change the date format "m/d/yyyy" to ISO w/o validating
    // TODO: validate date
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

export function updateAssignment(slotID, assigneeName) {
  return (dispatch, getState) => {

    // flag that we're saving now
    dispatch({
      type: types.SAVING_ASSIGNEE,
      id: slotID
    });

    // get assignee ID if exists, otherwise create one
    let assigneeID = fromAccessors.getAssigneeIDByName(getState(), assigneeName);
    if (!assigneeID) {
      assigneeID = uuid.v4();
      dispatch({
        type: types.ADD_ASSIGNEE,
        id: assigneeID,
        name: assigneeName
      });
    }

    // create assignee Object
    const newAssignee = {
      name: assigneeName,
      id: assigneeID
    };

    // AJAX call, then update state if successful
    fetchApi.updateAssignee(slotID, newAssignee, (status) => {
      return dispatch(updateAssigneeSuccess(slotID, newAssignee));
    })
    .catch(error => {
      console.log("fetch rejected", error);
    });
  };
}

// for rollback on failure see https://github.com/reactjs/redux/blob/master/examples/shopping-cart/src/actions/index.js

export function addSlot(text, id) {
  // TODO: DO OTHER STUFF
  // this needs to do several things:
  //   1. flag that we're saving the slot now (can implement later)
  //   2. get assignment ID if it exists, otherwise update state with a new one
  //   3. AJAX call, then update state if successful
  //
  // Updating state after AJAX means add the new slot, add the slot ID to the card

  return {
    type: types.ADD_SLOT,
    id,
    text
  };
}

export function setFilter(filter) {
  return {
    type: types.SET_FILTER,
    filter
  };
}

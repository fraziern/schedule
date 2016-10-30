// *** ACTIONS *** //
// TODO: change this to actions.js
import fetchApi from "../api/fetchApi.js";
import * as types from "../constants/ActionTypes.js";
import * as fromAccessors from "../reducers/accessors.js";
import uuid from "uuid";
import moment from "moment";

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

function updateLabelSuccess(cardID, label) {
  return {
    type: types.UPDATE_LABEL,
    cardID,
    label
  };
}

function addSlotToCardSuccess(cardID, slot) {
  return {
    type: types.ADD_SLOT_TO_CARD,
    cardID,
    slot
  };
}

function deleteSlotFromCardSuccess(cardID, slotID) {
  return {
    type: types.DELETE_SLOT_FROM_CARD,
    cardID,
    slotID
  };
}

function deleteCardSuccess(cardID) {
  return {
    type: types.DELETE_CARD,
    cardID
  };
}

/// *** PUBLIC FUNCTIONS ***
// *************************

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
    const dateScheduled = new moment(newDate, ["M/D/YYYY"]);
    if (!dateScheduled.isValid()) return;
    let state = getState();

    // create a set of new slots based on the last chronological dateCard
    //  1. find latest date scheduled
    var lastNormDateCard = fromAccessors.getLastNormDatecard(state);

    //  2. iterate over the existing slots, create an object of new slots
    var newSlots = {};
    lastNormDateCard.slots.forEach((slotID) => {
      var id = uuid.v4();
      newSlots[id] = {
        _id: id,
        assignee: "",
        assignment: state.entities.slots[slotID].assignment
      };
    });

    //  3. create new dateCard
    let newDateCard = {
      _id: uuid.v4(),
      dateScheduled,
      slots: Object.keys(newSlots)
    };

    // addCard inputs normalized card and normalized list of new slots, returns normalized card
    fetchApi.addCard(newDateCard, newSlots, state, function (nCard) {
      return dispatch(addCardSuccess(nCard));
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
    fetchApi.updateAssignee(slotID, newAssignee, () => {
      return dispatch(updateAssigneeSuccess(slotID, newAssignee));
    })
    .catch(error => {
      console.warn("fetch rejected", error);
    });
  };
}

export function updateLabel(cardID, label) {
  return (dispatch) => {
    // AJAX call, then update state if successful
    fetchApi.updateLabel(cardID, label, () => {
      return dispatch(updateLabelSuccess(cardID, label));
    })
    .catch(error => {
      console.log("fetch rejected", error);
    });
  };
}

// for rollback on failure see https://github.com/reactjs/redux/blob/master/examples/shopping-cart/src/actions/index.js

export function addSlotToCard(assignmentName, cardID) {
  return (dispatch, getState) => {
    // TODO: DO OTHER STUFF
    // this needs to do several things:
    //   1. flag that we're saving the slot now (can implement later)
    //   2. get assignment ID if it exists, otherwise update state with a new one
    let assignmentID = fromAccessors.getAssignmentIDByName(getState(), assignmentName);
    if (!assignmentID) {
      assignmentID = uuid.v4();
      dispatch({
        type: types.ADD_ASSIGNMENT,
        id: assignmentID,
        name: assignmentName
      });
    }
    // TODO: The above can probably be refactored
    //   3. AJAX call, then update state if successful
    const newSlot = {
      _id: uuid.v4(),
      assignee: {
        name: "",
        id: "000"
      },
      assignment: {
        name: assignmentName,
        id: assignmentID
      }
    };
    //
    // Updating state after AJAX means add the new slot, add the slot ID to the card
    fetchApi.addSlotToCard(cardID, newSlot, () => {
      return dispatch(addSlotToCardSuccess(cardID, newSlot));
    })
    .catch(error => {
      console.warn("fetch rejected", error);
    });
  };
}

export function deleteSlotFromCard(cardID, slotID) {
  return (dispatch) => {
    fetchApi.deleteSlotFromCard(slotID, () => {
      return dispatch(deleteSlotFromCardSuccess(cardID, slotID));
    })
    .catch(error => {
      console.warn("fetch rejected", error);
    });
  };
}

export function setFilter(filter) {
  return {
    type: types.SET_FILTER,
    filter
  };
}

export function deleteCard(cardID) {
  return (dispatch) => {
    fetchApi.deleteCard(cardID, () => {
      return dispatch(deleteCardSuccess(cardID));
    });
  };
}

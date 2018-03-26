// *** ACTIONS *** //
// TODO: change this to actions.js
import fetchApi from "../api/fetchApi.js";
import authApi from "../api/authApi.js";
import * as types from "../constants/ActionTypes.js";
import * as fromAccessors from "../reducers/assignmentsAccessors";
import uuid from "uuid";
import moment from "moment";
import { browserHistory } from "react-router";
import * as constants from "../constants/Constants.js";
import { arrayMove } from "react-sortable-hoc";

// NOTE: this should mainly work with normalized objects. fetchApi takes
// normalized objects and knows how to convert for the db

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

function resortSlotsSuccess(cardID, newSlotsList) {
  return {
    type: types.RESORT_SLOTS,
    cardID,
    newSlotsList
  };
}

function deleteCardSuccess(cardID) {
  return {
    type: types.DELETE_CARD,
    cardID
  };
}

function receiveUser(user) {
  return {
    type: types.RECEIVE_USER,
    user
  };
}

/// *** PUBLIC FUNCTIONS ***
// *************************

export function loadAllCards() {
  return async dispatch => {
    let cards = await fetchApi.getAllCards();
    dispatch(receiveCards(cards));
  };
}

export function markUnsaved(id) {
  return {
    type: types.MARK_UNSAVED,
    id
  };
}

export function setFilter(filter) {
  return {
    type: types.SET_FILTER,
    filter
  };
}

export function updateReportFilter(filter) {
  return {
    type: types.UPDATE_REPORT_FILTER,
    filter
  };
}

export function setStartDate(dateString) {
  let date = "";
  if (dateString) {
    date = moment(dateString, constants.DATEFORMATS).format();
  }
  return {
    type: types.SET_STARTDATE,
    date
  };
}

export function setStopDate(dateString) {
  let date = "";
  if (dateString) {
    date = moment(dateString, constants.DATEFORMATS).format();
  }
  return {
    type: types.SET_STOPDATE,
    date
  };
}

export function addDateCard(newDate) {
  return async (dispatch, getState) => {
    const dateScheduled = new moment(newDate, ["M/D/YYYY"]);
    if (!dateScheduled.isValid()) return;
    let state = getState();

    // create a set of new slots based on the last chronological dateCard
    //  1. find latest date scheduled
    var lastNormDateCard = fromAccessors.getLastNormDatecard(state.assignments);

    //  2. iterate over the existing slots, create an object of new slots
    var newSlots = {};
    lastNormDateCard.slots.forEach(slotID => {
      var id = uuid.v4();
      newSlots[id] = {
        _id: id,
        assignee: "",
        assignment: state.assignments.entities.slots[slotID].assignment
      };
    });

    //  3. create new dateCard
    let newDateCard = {
      _id: uuid.v4(),
      dateScheduled,
      slots: Object.keys(newSlots)
    };

    // addCard inputs normalized card and normalized list of new slots, returns normalized card
    let nCard = await fetchApi.addCard(newDateCard, newSlots, state);
    dispatch(addCardSuccess(nCard));
  };
}

export function updateAssignment(slotID, assigneeName) {
  return async (dispatch, getState) => {
    // flag that we're saving now
    dispatch({
      type: types.SAVING_ASSIGNEE,
      id: slotID
    });

    // get assignee ID if exists, otherwise create one
    const state = getState();
    let assigneeID = fromAccessors.getAssigneeIDByName(
      state.assignments,
      assigneeName
    );
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
    try {
      await fetchApi.updateAssignee(slotID, newAssignee);
      dispatch(updateAssigneeSuccess(slotID, newAssignee));
    } catch (e) {
      console.warn("fetch rejected", e);
    }
  };
}

export function updateLabel(cardID, label) {
  return async dispatch => {
    // flag that we're saving now
    dispatch({
      type: types.SAVING_LABEL,
      cardID
    });

    // AJAX call, then update state if successful
    try {
      await fetchApi.updateLabel(cardID, label);
      dispatch(updateLabelSuccess(cardID, label));
    } catch (e) {
      console.warn("fetch rejected", e);
    }
  };
}

// for rollback on failure see https://github.com/reactjs/redux/blob/master/examples/shopping-cart/src/actions/index.js

export function addSlotToCard(assignmentName, cardID) {
  return async (dispatch, getState) => {
    // TODO: DO OTHER STUFF
    // this needs to do several things:
    //   1. flag that we're saving the slot now (can implement later)
    //   2. get assignment ID if it exists, otherwise update state with a new one
    const state = getState();
    let assignmentID = fromAccessors.getAssignmentIDByName(
      state.assignments,
      assignmentName
    );
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
    try {
      await fetchApi.addSlotToCard(cardID, newSlot);
      dispatch(addSlotToCardSuccess(cardID, newSlot));
    } catch (e) {
      console.warn("fetch rejected", e);
    }
  };
}

export function deleteSlotFromCard(cardID, slotID) {
  return async dispatch => {
    try {
      await fetchApi.deleteSlotFromCard(slotID);
      dispatch(deleteSlotFromCardSuccess(cardID, slotID));
    } catch (e) {
      console.warn("fetch rejected", e);
    }
  };
}

export function resortSlots(cardID, oldIndex, newIndex) {
  return async (dispatch, getState) => {
    const state = getState();
    const nCard = fromAccessors.getNormalizedDateCard(
      state.assignments,
      cardID
    );
    const newSlotList = arrayMove(nCard.slots, oldIndex, newIndex);

    // update state optimistically
    dispatch(resortSlotsSuccess(cardID, newSlotList));

    // AJAX call
    try {
      await fetchApi.updateSlots(cardID, newSlotList, state);
    } catch (e) {
      console.warn("re-sort rejected by server", e);
    }
  };
}

export function deleteCard(cardID) {
  return async dispatch => {
    try {
      await fetchApi.deleteCard(cardID);
      dispatch(deleteCardSuccess(cardID));
    } catch (e) {
      console.warn("delete card rejected", e);
    }
  };
}

export function login(username, password, location) {
  return dispatch => {
    authApi.login(username, password, (user, err) => {
      if (!err) {
        if (user.user.username) {
          dispatch(receiveUser(user));
          if (location.state && location.state.nextPathname) {
            browserHistory.push(location.state.nextPathname);
          } else {
            browserHistory.push("/");
          }
        } else if (user.message) {
          // TODO: dispatch error
          return user.message;
        }
      } else {
        // TODO: dispatch error
        return err;
      }
    });
  };
}

export function checkServerLogin() {
  return (dispatch, getState) => {
    const { userinfo } = getState();
    if (!userinfo.loggedInUser) {
      authApi.loggedin(response => {
        if (response.username) {
          dispatch(receiveUser({ user: response }));
        }
      });
    }
  };
}

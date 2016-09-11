// import { normalize, Schema, arrayOf } from "normalizr";
import * as types from "../constants/ActionTypes.js";

const initialState = {
  dateCards: [],
  isSaving: false,
  unsavedChanges: false
};

function flatSlot(slot) {
  return {
    ...slot,
    assignment: slot.assignment.name,
    assignee: slot.assignee.name
  };
}

function flatDateCard(dateCard) {
  return {
    ...dateCard,
    slots: dateCard.slots.map(slot => flatSlot(slot))
  };
}

function updateSlotsAssignee(dateCard, id, assignee) {
  return {
    ...dateCard,
    slots: dateCard.slots.map(slot =>
      (slot.id === id) ? { ...slot, assignee } : slot
  )};
}

export default function assignments(state = initialState, action) {
  // let response;
  switch (action.type) {

  case types.RECEIVE_ALLCARDS:
    return { ...initialState,
      dateCards: action.dateCards.map(dateCard => flatDateCard(dateCard))
    };

  case types.UNSAVED_CHANGES:
    return { ...state,
      unsavedChanges: true
    };

  case types.UPDATE_ASSIGNMENT:
    return { ...state,
      isSaving: true,
      unsavedChanges: false,  // do this at start of save in case user changes things while saving
      dateCards: state.dateCards.map(dateCard => updateSlotsAssignee(dateCard, action.assignmentId, action.assignee))
    };

  case types.UPDATE_ASSIGNMENT_SUCCESS:
    return { ...state,
      isSaving: false
    };

  case types.UPDATE_UNSAVED_ASSN:
    return { ...state,
      unsavedAssn: { ...state.unsavedAssn, [action.assignmentId]: action.assignee }
    };

  default:
    return state;
  }

}

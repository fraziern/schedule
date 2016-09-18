import { normalize, Schema, arrayOf } from "normalizr";
import * as types from "../constants/ActionTypes.js";
import * as fromAccessors from "./accessors.js";
import uuid from "uuid";

const initialState = {
  dateCards: null,
  isSaving: false,
  unsavedChanges: false,
  isLoaded: false
};

// normalizr schemas
const datecard = new Schema("dateCards");
const assignee = new Schema("assignees");
const assignment = new Schema("assignments");
const slot = new Schema("slots");

slot.define({
  assignment: assignment,
  assignee: assignee
});

datecard.define({
  slots: arrayOf(slot)
});

export function addAssignee(state, id, assignee) {
  const newAssignees = { ...state.dateCards.entities.assignees, [id]: {
    id: id,
    name: assignee
  }};
  const newEntities = { ...state.dateCards.entities, assignees: newAssignees };
  const newDateCards = { ...state.dateCards, entities: newEntities };
  return { ...state, dateCards: newDateCards };
}

export function updateSlotAssignee(state, slotID, newAssignee) {
  // takes an assignee by name, looks up the ID, creates a new one if needed
  let assigneeID = fromAccessors.getAssigneeIDByName(state, newAssignee);
  let newState = state;
  // debugger;
  if (!assigneeID) {
    assigneeID = uuid.v4();
    newState = addAssignee(state, assigneeID, newAssignee);
  }

  const oldSlot = fromAccessors.getNormalizedSlot(state, slotID);
  const newSlot = { ...oldSlot, assignee: assigneeID };
  const newSlots = { ...newState.dateCards.entities.slots, [slotID]: newSlot };
  const newEntities = { ...newState.dateCards.entities, slots: newSlots };
  const newDateCards = { ...newState.dateCards, entities: newEntities };
  return { ...newState, dateCards: newDateCards };
}


export function getDateCards(state) {
  if (!state.isLoaded) return null;

  return state.dateCards.result.map(dateCardID => {
    const normalizedDateCard = fromAccessors.getNormalizedDateCard(state, dateCardID);
    return {
      id: dateCardID,
      dateScheduled: normalizedDateCard.dateScheduled,
      slots: fromAccessors.getSlots(state, normalizedDateCard.slots)
    };
  });
}

export default function assignments(state = initialState, action) {
  // let response;
  switch (action.type) {

  case types.RECEIVE_ALLCARDS:
    return { ...initialState,
      dateCards: normalize(action.dateCards, arrayOf(datecard)),
      isLoaded: true
    };

  case types.UNSAVED_CHANGES:
    return { ...state,
      unsavedChanges: true
    };

  case types.UPDATE_ASSIGNMENT:
    return updateSlotAssignee(
      state,
      action.id,
      action.assignee
    );

  case types.UPDATE_ASSIGNMENT_SUCCESS:
    return { ...state,
      isSaving: false
    };

  default:
    return state;
  }
}

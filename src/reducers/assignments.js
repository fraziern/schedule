import * as types from "../constants/ActionTypes.js";
import * as fromAccessors from "./accessors.js";
import uuid from "uuid";
import update from "react-addons-update";

const initialState = {
  isSaving: false,
  unsavedChanges: false,
  isLoaded: false
};

function addAssignee(state, id, name) {
  return update(state, {
    entities: {assignees: {$merge: {
      [id]: {
        id,
        name
      }
    }}}
  });
}

function addSlot(state, id, assignment, assignee) {
  return update(state, {
    entities: {slots: {$merge: {
      [id]: {
        id,
        assignment,
        assignee
      }
    }}}
  });
}

function updateSlotAssignee(state, slotID, newAssignee) {
  // takes an assignee by name, looks up the ID, creates a new one if needed
  let assigneeID = fromAccessors.getAssigneeIDByName(state, newAssignee);
  let newState = state;
  if (!assigneeID) {
    assigneeID = uuid.v4();
    newState = addAssignee(state, assigneeID, newAssignee);
  }
  return update(newState, {
    entities: {slots: {[slotID]: {assignee: {$set: assigneeID }}}}
  });
}

function addDateCard(state, newDate) {
  // for now we'll change the date format "m/d/yyyy" to ISO w/o validating
  const dateScheduled = new Date(newDate);
  let newState = state;

  // create a set of new slots based on existing assignments list
  var newSlots = Object.keys(state.entities.assignments).reduce((obj, assignment) => {
    const newSlotId = uuid.v4();
    return { ...obj,
      [newSlotId]: {
        id: newSlotId,
        assignment,
        assignee: null
      }
    };
  }, {});
  newState = update(newState, {
    entities: {slots: {$merge: newSlots }}
  });

  // create new dateCard
  let newDateCard = {
    id: uuid.v4(),
    dateScheduled,
    slots: Object.keys(newSlots)
  };

  // add it to the existing dateCards and visibleCards
  return update(newState, {
    entities: {dateCards: {$merge: { [newDateCard.id]: newDateCard }}},
    visibleCards: {$push: [newDateCard.id]}
  });
}

// *** selectors ***
export function getVisibleDateCards(state) {
  if (!state.isLoaded) return null;

  return state.visibleCards.map(dateCardID => {
    const normalizedDateCard = fromAccessors.getNormalizedDateCard(state, dateCardID);
    return {
      id: dateCardID,
      dateScheduled: normalizedDateCard.dateScheduled,
      slots: fromAccessors.getSlots(state, normalizedDateCard.slots)
    };
  });
}

// *** main reducer ***
export default function assignments(state = initialState, action) {
  // let response;
  switch (action.type) {

  case types.RECEIVE_ALLCARDS:
    var normalized = action.dateCards;
    return {
      ...initialState,
      entities: normalized.entities,
      visibleCards: normalized.result,
      isLoaded: true
    };

  case types.UNSAVED_CHANGES:
    return { ...state,
      unsavedChanges: true
    };

  case types.ADD_DATECARD:
    return addDateCard(state, action.newDate);

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

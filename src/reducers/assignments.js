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

function addDateCard(state, card) {
  // card: a normalized card
  // We only need to merge in dateCards, slots, and visibleCards
  // because there are no new assignments/assignees
  // and ids for assignments have not changed

  return update(state, {
    entities: {
      dateCards: {$merge: card.entities.dateCards },
      slots: {$merge: card.entities.slots }},
    visibleCards: {$push: [card.result]}
  });
}

function sortCardsAsc(state) {
  var orderedCards = state.visibleCards;
  orderedCards.sort(function(a, b) {
    const aDate = state.entities.dateCards[a].dateScheduled;
    const bDate = state.entities.dateCards[b].dateScheduled;
    if (aDate < bDate) return -1;
    if (aDate > bDate) return 1;
    return 0;
  });
  return {...state, visibleCards: orderedCards};
}

// *** selectors ***
export function getVisibleDateCards(state) {
  if (!state.isLoaded) return null;

  // TODO: make this dependant on state.sort
  const sortedState = sortCardsAsc(state);

  return sortedState.visibleCards.map(dateCardID => {
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
      isLoaded: true,
      sort: "asc"
    };

  case types.UNSAVED_CHANGES:
    return { ...state,
      unsavedChanges: true
    };

  case types.ADD_DATECARD:
    return addDateCard(state, action.card);

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

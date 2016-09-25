import * as types from "../constants/ActionTypes.js";
import * as fromAccessors from "./accessors.js";
import update from "react-addons-update";
import moment from "moment";

const initialState = {
  isSaving: false,
  isLoaded: false,
  currentDate: moment().format(),
  cutoffDate: moment().add(2, "weeks").format()
};

// *** private helper functions ***

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

// function addSlot(state, id, assignment, assignee) {
//   return update(state, {
//     entities: {slots: {$merge: {
//       [id]: {
//         id,
//         assignment,
//         assignee
//       }
//     }}}
//   });
// }

function updateSlotAssignee(state, slotID, newAssignee) {
  return update(state, {
    entities: {slots: {[slotID]: {
      assignee: {$set: newAssignee.id },
      saved: {$set: true }
    }}}
  });
}

function markUnsaved(state, slotID) {
  return update(state, {
    entities: {slots: {[slotID]: {
      saved: {$set: false }
    }}}
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

  // remove old cards
  var filteredList = sortedState.visibleCards.filter(dateCardID => {
    const normalizedDateCard = fromAccessors.getNormalizedDateCard(state, dateCardID);
    if (normalizedDateCard.dateScheduled < state.currentDate) return false;
    return true;
  });

  // convert normalized state to something we can use
  return filteredList.map(dateCardID => {
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

  case types.SORT_ASCENDING:
    return sortCardsAsc(state);

  case types.HIDE_OLDCARDS:
    return state;

  case types.ADD_DATECARD:
    return addDateCard(state, action.card);

  case types.UPDATE_ASSIGNEE:
    return updateSlotAssignee(
      state,
      action.id,
      action.assignee
    );

  case types.MARK_UNSAVED:
    return markUnsaved(
      state,
      action.id
    );

  case types.ADD_ASSIGNEE:
    return addAssignee(
      state,
      action.id,
      action.name
    );

  default:
    return state;
  }
}

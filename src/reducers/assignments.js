import * as types from "../constants/ActionTypes.js";
// import * as fromAccessors from "./assignmentsAccessors";
import update from "immutability-helper";
import moment from "moment";

const initialState = {
  isSaving: false,
  isLoaded: false,
  loggedInUser: null,
  currentDate: moment()
    .startOf("date")
    .format(),
  cutoffDate: moment()
    .startOf("date")
    .add(2, "weeks")
    .format(),
  startDate: moment()
    .startOf("date")
    .format(),
  stopDate: "",
  filter: "ALL"
};

// *** private helper functions ***

function addAssignee(state, id, name) {
  return update(state, {
    entities: {
      assignees: {
        $merge: {
          [id]: {
            id,
            name
          }
        }
      }
    }
  });
}

function addSlot(state, slot) {
  return update(state, {
    entities: {
      slots: {
        $merge: {
          [slot._id]: {
            _id: slot._id,
            assignment: slot.assignment.id,
            assignee: slot.assignee.id,
            id: slot._id
          }
        }
      }
    }
  });
}

function addAssignment(state, id, name) {
  return update(state, {
    entities: {
      assignments: {
        $merge: {
          [id]: {
            id,
            name
          }
        }
      }
    }
  });
}

function addSlotToCard(state, cardID, slot) {
  return update(state, {
    entities: {
      slots: {
        $merge: {
          [slot._id]: {
            _id: slot._id,
            assignment: slot.assignment.id,
            assignee: slot.assignee.id
          }
        }
      },
      dateCards: { [cardID]: { slots: { $push: [slot._id] } } }
    }
  });
}

function savingLabel(state, cardID) {
  return update(state, {
    entities: {
      dateCards: {
        [cardID]: {
          labelSaving: { $set: true }
        }
      }
    }
  });
}

function updateLabel(state, cardID, label) {
  return update(state, {
    entities: {
      dateCards: {
        [cardID]: {
          label: { $set: label },
          labelSaving: { $set: false },
          labelSaved: { $set: true }
        }
      }
    }
  });
}

function deleteSlotFromCard(state, cardID, slotID) {
  // just pull the slot ID from the slots array. everything else will get
  // cleaned up on the next app refresh
  var newSlots = state.entities.dateCards[cardID].slots.filter(
    el => el !== slotID
  );
  return update(state, {
    entities: {
      dateCards: { [cardID]: { slots: { $set: newSlots } } }
    }
  });
}

function resortSlots(state, cardID, newSlotsList) {
  return update(state, {
    entities: {
      dateCards: { [cardID]: { slots: { $set: newSlotsList } } }
    }
  });
}

function savingSlotAssignee(state, slotID) {
  return update(state, {
    entities: {
      slots: {
        [slotID]: {
          isSaving: { $set: true }
        }
      }
    }
  });
}

function updateSlotAssignee(state, slotID, newAssignee) {
  return update(state, {
    entities: {
      slots: {
        [slotID]: {
          assignee: { $set: newAssignee.id },
          saved: { $set: true },
          isSaving: { $set: false }
        }
      }
    }
  });
}

function markUnsaved(state, slotID) {
  // TODO: How do we cancel an updateSlotAssignee in progress?
  return update(state, {
    entities: {
      slots: {
        [slotID]: {
          saved: { $set: false },
          isSaving: { $set: false }
        }
      }
    }
  });
}

function addDateCard(state, card) {
  // card: a normalized card
  // We only need to merge in dateCards, slots, and sortedCards
  // because there are no new assignments/assignees
  // and ids for assignments have not changed

  const unsortedState = update(state, {
    entities: {
      dateCards: { $merge: card.entities.dateCards },
      slots: { $merge: card.entities.slots }
    },
    sortedCards: { $push: [card.result] }
  });
  return sortCardsAsc(unsortedState);
}

function deleteDateCard(state, cardID) {
  var newDateCards = {};
  for (var card in state.entities.dateCards) {
    if (card !== cardID) newDateCards[card] = state.entities.dateCards[card];
  }

  var newSortedCards = state.sortedCards.filter(id => {
    return id !== cardID;
  });

  return update(state, {
    entities: {
      dateCards: { $set: newDateCards }
    },
    sortedCards: { $set: newSortedCards }
  });
}

function sortCardsAsc(state) {
  if (state.sortedCards.length < 2) return state;
  var orderedCards = state.sortedCards;
  orderedCards.sort(function(a, b) {
    const aDate = state.entities.dateCards[a].dateScheduled;
    const bDate = state.entities.dateCards[b].dateScheduled;
    if (aDate < bDate) return -1;
    if (aDate > bDate) return 1;
    return 0;
  });
  return { ...state, sortedCards: orderedCards };
}

// ***
// EVERYTHING BELOW IS PUBLIC
// ***

// *** main reducer ***
export default function assignments(state = initialState, action) {
  switch (action.type) {
    case types.RECEIVE_ALLCARDS:
      var normalized = action.dateCards;
      var newState = {
        ...state,
        entities: normalized.entities,
        sortedCards: normalized.result,
        isLoaded: true,
        sort: "asc"
      };
      return sortCardsAsc(newState);

    case types.SORT_ASCENDING:
      return sortCardsAsc(state);

    case types.ADD_DATECARD:
      return addDateCard(state, action.card);

    case types.SAVING_ASSIGNEE:
      return savingSlotAssignee(state, action.id);

    case types.UPDATE_ASSIGNEE:
      return updateSlotAssignee(state, action.id, action.assignee);

    case types.SAVING_LABEL:
      return savingLabel(state, action.cardID);

    case types.UPDATE_LABEL:
      return updateLabel(state, action.cardID, action.label);

    case types.MARK_UNSAVED:
      return markUnsaved(state, action.id);

    case types.ADD_ASSIGNEE:
      return addAssignee(state, action.id, action.name);

    case types.SET_FILTER:
      return { ...state, filter: action.filter };

    case types.SET_STARTDATE:
      return { ...state, startDate: action.date };

    case types.SET_STOPDATE:
      return { ...state, stopDate: action.date };

    case types.ADD_SLOT:
      return addSlot(state, action.slot);

    case types.ADD_ASSIGNMENT:
      return addAssignment(state, action.id, action.name);

    case types.ADD_SLOT_TO_CARD:
      return addSlotToCard(state, action.cardID, action.slot);

    case types.RESORT_SLOTS:
      return resortSlots(state, action.cardID, action.newSlotsList);

    case types.DELETE_SLOT_FROM_CARD:
      return deleteSlotFromCard(state, action.cardID, action.slotID);

    case types.DELETE_CARD:
      return deleteDateCard(state, action.cardID);

    default:
      return state;
  }
}

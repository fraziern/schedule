// These all take the base "state" as input, not state.assignments

import * as fromAccessors from "../reducers/assignmentsAccessors";
import { createSelector } from "reselect";

const getStartDate = (state) => state.assignments.startDate;
const getStopDate = (state) => state.assignments.stopDate;
const getAssignments = (state) => state.assignments;

function filterIDListByDate(list, assignments, startDate, stopDate) {
  // return only cards between startDate and stopDate
  return assignments.sortedCards.filter(dateCardID => {
    const normalizedDateCard = fromAccessors.getNormalizedDateCard(assignments, dateCardID);
    if (normalizedDateCard.dateScheduled < startDate) return false;
    if (stopDate && normalizedDateCard.dateScheduled > stopDate) return false;
    return true;
  });
}

export const getVisibleDateCardsAndDenormalize = createSelector(
  [ getAssignments, getStartDate, getStopDate ],
  (assignments, startDate, stopDate) => {
    if (!assignments.isLoaded) return null;

    const filteredList = filterIDListByDate(assignments.sortedCards, assignments, startDate, stopDate);

    // convert normalized state to something we can use
    return filteredList.map(dateCardID => {
      const normalizedDateCard = fromAccessors.getNormalizedDateCard(assignments, dateCardID);
      return {
        id: dateCardID,
        dateScheduled: normalizedDateCard.dateScheduled,
        label: normalizedDateCard.label,
        slots: fromAccessors.getSlots(assignments, normalizedDateCard.slots)
      };
    });
  }
);

export const getAssigneeRankings = (assignments, startDate, stopDate) => {
  // returns a map of the format
  // {"name": #ofassignments}

  // return only cards between startDate and stopDate
  const filteredList = filterIDListByDate(assignments.sortedCards, assignments, startDate, stopDate);

  // create array of slot IDs only
  var slotList = filteredList.reduce((prev, curr) => {
    return prev.concat(assignments.entities.datecards[curr]);
  }, []);

  // build frequency map of slot assignees by ID
  var freqByID = slotList.reduce((prev, curr) => {
    const normSlot = fromAccessors.getNormalizedSlot(assignments, curr);
    if (normSlot in prev) return prev.normSlot += 1;
    else return prev.normSlot = 1;
  }, {});

  return freqByID;
};

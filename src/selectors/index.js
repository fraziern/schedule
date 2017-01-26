// reselect selectors
// These all take the base "state" as input, not state.assignments

import * as fromAccessors from "../reducers/assignmentsAccessors";
import { createSelector } from "reselect";
import moment from "moment";

const getStartDate = (state) => state.assignments.startDate;
const getStopDate = (state) => state.assignments.stopDate;
const getAssignments = (state) => state.assignments;

function getStartDateByFilter(filter) {
  let time = {};
  switch (filter) {

  case "Year":
    time = {len: 1, unit: "years"};
    break;

  case "9 Months":
    time = {len: 9, unit: "months"};
    break;

  case "6 Months":
    time = {len: 6, unit: "months"};
    break;

  case "3 Months":
    time = {len: 3, unit: "months"};
    break;

  default:
    time = {len: 1, unit: "years"};
  }
  return moment().startOf("date").subtract(time.len, time.unit).format();
}

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

// TODO: once we need more performance, create a separate memoized function that returns last year, then use the public selector to filter by start and stop
export const getAssigneeRankings = (assignments, startDate, stopDate) => {
  // returns a map of the format
  // { "SDIUHS-asd-3423": {frequency: 10, assignee: "Bob"}}

  if (!assignments.isLoaded) return null;

  // if no startDate or stopDate specified, use the last 1 year
  if (!stopDate) stopDate = moment().startOf("date").format();
  if (!startDate) startDate = moment().startOf("date").subtract(1, "years").format();

  // return only cards between startDate and stopDate
  const filteredList = filterIDListByDate(assignments.sortedCards, assignments, startDate, stopDate);

  // create array of slot IDs only
  var slotList = filteredList.reduce((prev, curr) => {
    return prev.concat(assignments.entities.dateCards[curr].slots);
  }, []);

  let freqByID = {};
  // build frequency map of slot assignees by ID
  slotList.forEach((el) => {
    let assigneeID = assignments.entities.slots[el].assignee;
    if (assigneeID in freqByID) freqByID[assigneeID].frequency += 1;
    else {
      const assignee = fromAccessors.getAssignee(assignments, assigneeID).name;
      freqByID[assigneeID] = {
        frequency: 1,
        assignee
      };
    }
  });

  return freqByID;
};

export const getAssigneeRankingsByFilter = (assignments, filter) => {
  return getAssigneeRankings(assignments, getStartDateByFilter(filter));
};

export const getEmptySlotReport = (assignments, startDate) => {

  if (!assignments.isLoaded) return null;

  if (!startDate) startDate = moment().startOf("date").subtract(1, "years").format();
  const stopDate = moment().endOf("date").format();

  const filteredList = filterIDListByDate(assignments.sortedCards, assignments, startDate, stopDate);

  // create array of assignee IDs where name is blank
  let blankAssignees = [];
  for (var el in assignments.entities.assignees) {
    const assignee = assignments.entities.assignees[el];
    if (assignee.name === "") blankAssignees.push(el);
  }

  // iterate over all slots, by date, and build table
  let emptySlots = {};
  filteredList.forEach((el) => {
    const dateCard = assignments.entities.dateCards[el];
    const dateScheduled = dateCard.dateScheduled;
    let frequency = 0;
    dateCard.slots.forEach((el) => {
      // if this ID is one of the blank assignees IDs
      if (blankAssignees.indexOf(assignments.entities.slots[el].assignee) >= 0) {
        frequency++;
      }
    });
    emptySlots[el] = { dateScheduled, frequency };
  });
  return emptySlots;
};

export const getEmptySlotReportByFilter = (assignments, filter) => {
  return getEmptySlotReport(assignments, getStartDateByFilter(filter));
};

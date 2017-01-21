import moment from "moment";
// These all operate on the "assignments" reducer piece, so "state"
// is assumed to be state.assignments

function getEntityFunction(entity) {
  return function (state, id) {
    return state.entities[entity][id];
  };
}

function getEntityIDByNameFunction(entity) {
  return function (state, name) {
    const elements = state.entities[entity];
    for (var element in elements) {
      if (elements[element].name === name) return elements[element].id;
    }
    return null;
  };
}

export function getAssignee(state, id) {
  return getEntityFunction("assignees")(state, id);
}

export function getAssignment(state, id) {
  return getEntityFunction("assignments")(state, id);
}

export function getNormalizedSlot(state, id) {
  return getEntityFunction("slots")(state, id);
}

export function getNormalizedDateCard(state, id) {
  return getEntityFunction("dateCards")(state, id);
}

export function getAssigneeIDByName(state, newAssignee) {
  return getEntityIDByNameFunction("assignees")(state, newAssignee);
}

export function getAssignmentIDByName(state, newAssignment) {
  return getEntityIDByNameFunction("assignments")(state, newAssignment);
}

export function getSlots(state, slotsIDs) {
  return slotsIDs.map(slotsID => {
    const slot = getNormalizedSlot(state, slotsID);
    return {
      id: slotsID,
      assignment: getAssignment(state, slot.assignment),
      assignee: getAssignee(state, slot.assignee),
      saved: slot.saved,
      isSaving: slot.isSaving
    };
  });
}

export function getLastNormDatecard(state) {
  // helper function to find the last in time datecard and return the
  //  normalized version of it

  // find the latest date, save ID
  var last = {
    id: "",
    date: "0"
  };
  Object.keys(state.entities.dateCards).forEach((id) => {
    var date = state.entities.dateCards[id].dateScheduled;
    if (date > last.date) {
      last = {
        id,
        date
      };
    }
  });

  if (last.id !== "") return state.entities.dateCards[last.id];
  else return undefined;
}

export function getSignupInfo(state, cardID, slotID) {
  // return human-readable info on a signup, for messaging
  // returns { signupDate, assignmentName }
  const date = getNormalizedDateCard(state, cardID).dateScheduled;
  const signupDate = moment(date).format("MM/DD/YYYY");
  const slot = getNormalizedSlot(state, slotID);
  const assignmentName = getAssignment(state, slot.assignment).name;
  return { signupDate, assignmentName };
}

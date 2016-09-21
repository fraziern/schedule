function getEntityFunction(entity) {
  return function (state, id) {
    return state.entities[entity][id];
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

export function getSlots(state, slotsIDs) {
  return slotsIDs.map(slotsID => {
    const slot = getNormalizedSlot(state, slotsID);
    return {
      id: slotsID,
      assignment: getAssignment(state, slot.assignment),
      assignee: getAssignee(state, slot.assignee)
    };
  });
}

export function getAssigneeIDByName(state, newAssignee) {
  const assignees = state.entities.assignees;
  // debugger;
  for (var assignee in assignees) {
    if (assignees[assignee].name === newAssignee) return assignees[assignee].id;
  }
  return null;
}

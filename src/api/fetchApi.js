/*eslint no-console: ["error", { allow: ["warn", "error"] }] */

// this is the only place in the front-end where we should need to know
// the db schema

import { normalize, Schema, arrayOf } from "normalizr";
import * as fromAccessors from "../reducers/assignmentsAccessors";
import fetch from "isomorphic-fetch"; // fetch polyfill

// normalizr schemas
const dateCardSchema = new Schema("dateCards");
const assigneeSchema = new Schema("assignees");
const assignmentSchema = new Schema("assignments");
const slotSchema = new Schema("slots");

slotSchema.define({
  assignment: assignmentSchema,
  assignee: assigneeSchema
});

dateCardSchema.define({
  slots: arrayOf(slotSchema)
});

// Private helper functions
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}
function parseJSON(response) {
  return response.json();
}

function normalizeCard(card) {
  return normalize(card, dateCardSchema);
}

function normalizeCards(cards) {
  return normalize(cards, arrayOf(dateCardSchema));
}

function denormalizeSlot(slot, state) {
  // we have a normalized slot object, we need a db-formatted slot object
  const assignee = slot.assignee
    ? fromAccessors.getAssignee(state.assignments, slot.assignee)
    : { id: "000", name: "" };
  return {
    _id: slot._id,
    assignee,
    assignment: fromAccessors.getAssignment(state.assignments, slot.assignment)
  };
}

function denormalizeSlotIDs(slotIDs, state) {
  // we have an array of slotIDs, we need an array of db-formatted slots
  const fullSlots = fromAccessors.getSlots(state.assignments, slotIDs);
  return fullSlots.map(slot => ({
    _id: slot.id,
    assignee: slot.assignee,
    assignment: slot.assignment
  }));
}

function denormalizeCard(card, slots, state) {
  // we have a array of slotIDs, we need an array of slot objects in the card
  var newSlots = card.slots.map(slotID => {
    var slot = slots[slotID];
    return denormalizeSlot(slot, state);
  });
  return {
    ...card,
    slots: newSlots
  };
}

// *** PUBLIC FUNCTIONS BELOW ***

async function getAllCards() {
  try {
    let res = await fetch("/api/all", { credentials: "same-origin" });
    checkStatus(res);
    let json = await res.json();
    return normalizeCards(json.dateCards);
  } catch (e) {
    console.warn("fetch all request failed", e);
  }
}

async function addCard(dateCard, slots, state) {
  let denormalizedCard = denormalizeCard(dateCard, slots, state);

  try {
    let res = await fetch("/api/add", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        dateCard: denormalizedCard
      })
    });
    checkStatus(res);
    let json = await res.json();
    return normalizeCard(json.saved, dateCardSchema);
  } catch (e) {
    console.warn("add card request failed", e);
  }
}

async function updateAssignee(slotID, assignee) {
  try {
    let res = await fetch("/api/update-assignee/" + slotID, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        assignee
      })
    });
    checkStatus(res);
    return res;
  } catch (e) {
    console.warn("updateAssignee request failed", e);
    return Promise.reject(e);
  }
}

async function updateLabel(cardID, label) {
  try {
    let res = await fetch("/api/update-label/" + cardID, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        label
      })
    });
    checkStatus(res);
    return res;
  } catch (e) {
    console.warn("updateLabel request failed", e);
    return Promise.reject(e);
  }
}

async function addSlotToCard(cardID, slot) {
  try {
    let res = await fetch("/api/add-slot/" + cardID, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        slot
      })
    });
    checkStatus(res);
    return res;
  } catch (e) {
    console.warn("addSlotToCard request failed", e);
    return Promise.reject(e);
  }
}

async function deleteSlotFromCard(slotID, cb) {
  try {
    let res = await fetch("/api/remove-slot/" + slotID, {
      method: "DELETE",
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    checkStatus(res);
    return res;
  } catch (e) {
    console.warn("deleteSlotFromCard request failed", e);
    return Promise.reject(e);
  }
}

// This is used for re-sorting slots
async function updateSlots(cardID, newSlotList, state) {
  const newSlots = denormalizeSlotIDs(newSlotList, state);

  try {
    let res = await fetch("/api/update-slots/" + cardID, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        slots: newSlots
      })
    });
    checkStatus(res);
    return res;
  } catch (e) {
    console.warn("updateSlots request failed", e);
  }
}

async function deleteCard(cardID) {
  try {
    let res = await fetch("/api/del/" + cardID, {
      method: "DELETE",
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    checkStatus(res);
    return res;
  } catch (e) {
    console.warn("deleteCard request failed", error);
    return Promise.reject(error);
  }
}

export default {
  getAllCards,

  addCard,

  updateAssignee,

  updateLabel,

  addSlotToCard,

  deleteSlotFromCard,

  updateSlots,

  deleteCard
};

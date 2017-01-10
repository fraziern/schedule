/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
import { normalize, Schema, arrayOf } from "normalizr";
import * as fromAccessors from "../reducers/accessors.js";
import fetch from "isomorphic-fetch";  // fetch polyfill

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
  // we have a normalized slot object (just IDs), we need a slot object
  var assignee = (slot.assignee) ? fromAccessors.getAssignee(state, slot.assignee) : { id: "000", name: "" };
  return {
    _id: slot._id,
    assignee,
    assignment: fromAccessors.getAssignment(state.assignments, slot.assignment)
  };
}

function denormalizeCard(card, slots, state) {
  // we have a array of slotIDs, we need an array of slot objects
  var newSlots = card.slots.map((slotID) => {
    var slot = slots[slotID];
    return denormalizeSlot(slot, state);
  });
  return {
    ...card,
    slots: newSlots
  };
}

// *** PUBLIC FUNCTIONS BELOW ***

export default {
  getAllCards(cb) {
    fetch("/api/all", { credentials : "same-origin" })
      .then(checkStatus)
      .then(parseJSON)
      .then(json => normalizeCards(json.dateCards))
      .then(cb)
      .catch(error => {
        console.warn("fetch all request failed", error);
      });
  },

  addCard(dateCard, slots, state, cb) {
    var denormalizedCard = denormalizeCard(dateCard, slots, state);

    fetch("/api/add", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        dateCard: denormalizedCard
      })
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(json => cb(normalizeCard(json.saved, dateCardSchema)))
      .catch(error => {
        console.warn("addCard request failed", error);
      });
  },

  updateAssignee(slotID, assignee, cb) {
    return fetch("/api/update-assignee/" + slotID, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        assignee
      })
    })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
    .catch(error => {
      console.warn("updateAssignee request failed", error);
      return Promise.reject(error);
    });
  },

  updateLabel(cardID, label, cb) {
    return fetch("/api/update-label/" + cardID, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        label
      })
    })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
    .catch(error => {
      console.warn("updateAssignee request failed", error);
      return Promise.reject(error);
    });
  },

  addSlotToCard(cardID, slot, cb) {
    return fetch("/api/add-slot/" + cardID, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        slot
      })
    })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
    .catch(error => {
      console.warn("addSlotToCard request failed", error);
      return Promise.reject(error);
    });
  },

  deleteSlotFromCard(slotID, cb) {
    return fetch("/api/remove-slot/" + slotID, {
      method: "DELETE",
      credentials: "same-origin",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
    .catch(error => {
      console.warn("deleteSlotFromCard request failed", error);
      return Promise.reject(error);
    });
  },

  deleteCard(cardID, cb) {
    return fetch("/api/del/" + cardID, {
      method: "DELETE",
      credentials: "same-origin",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
    .catch(error => {
      console.warn("deleteCard request failed", error);
      return Promise.reject(error);
    });
  }
};

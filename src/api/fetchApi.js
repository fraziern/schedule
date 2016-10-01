/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
import { normalize, Schema, arrayOf } from "normalizr";
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

  addCard(card, cb) {
    fetch("/api/add", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        dateCard: card
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
  }
};

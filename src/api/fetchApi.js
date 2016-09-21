import { normalize, Schema, arrayOf } from "normalizr";
import _default from "./default.json";

/**
 * Mocking client-server processing
 */

// normalizr schemas
const datecard = new Schema("dateCards");
const assignee = new Schema("assignees");
const assignment = new Schema("assignments");
const slot = new Schema("slots");

slot.define({
  assignment: assignment,
  assignee: assignee
});

datecard.define({
  slots: arrayOf(slot)
});

const _defaultNormalized = normalize(_default.dateCards, arrayOf(datecard));

const TIMEOUT = 200;

export default {
  getAllCards(cb, timeout) {
    setTimeout(() => cb(_defaultNormalized), timeout || TIMEOUT);
  },
  updateAssignee(cb, timeout) {
    setTimeout(() => cb({ status: "OK" }), timeout || TIMEOUT);
  }
};

/**
 * Mocking client-server processing
 */
import _default from "./default.json";

const TIMEOUT = 200;

export default {
  getAllCards(cb, timeout) {
    setTimeout(() => cb(_default), timeout || TIMEOUT);
  },
  updateAssignee(cb, timeout) {
    setTimeout(() => cb({ status: "OK" }), timeout || TIMEOUT);
  }
};

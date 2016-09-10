/**
 * Mocking client-server processing
 */
import _default from "./default.json";

const TIMEOUT = 100;

export default {
  getAllCards(cb, timeout) {
    setTimeout(() => cb(_default), timeout || TIMEOUT);
  }
};

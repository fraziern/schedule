/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
import fetch from "isomorphic-fetch";  // fetch polyfill

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



// *** PUBLIC FUNCTIONS BELOW ***

export default {
  login(username, password, cb) {
    fetch("/auth/login", {
      method: "POST",
      credentials : "same-origin",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(cb)
      .catch(error => {
        console.warn("login request failed", JSON.stringify(error));
      });
  }
};

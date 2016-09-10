import fetchApi from "../api/fetchApi.js";
import * as types from "../constants/ActionTypes.js";

function receiveCards(cards) {
  return {
    type: types.RECEIVE_ALLCARDS,
    cards: cards
  };
}

export function getAllCards() {
  return dispatch => {
    fetchApi.getAllCards(cards => {
      dispatch(receiveCards(cards));
    });
  };
}

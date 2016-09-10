import { RECEIVE_ALLCARDS } from "../constants/ActionTypes.js";

const initialState = {
  dateCards: []
};

export default function assignments(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_ALLCARDS:
      return Object.assign({}, state, {
        dateCards: action.dateCards
      });
    default:
      return state;
  }


}

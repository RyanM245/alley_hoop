import axios from "axios";

const initialState = {
  player: {},
  isLoggedIn: false,
};

const LOGIN_PLAYER = "LOGIN_PLAYER";

export function loginPlayer(player) {
  return {
    type: LOGIN_PLAYER,
    payload: player,
  };
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_PLAYER:
      return { ...state, player: action.payload, isLoggedIn: true };
    default:
      return initialState;
  }
}

import axios from "axios";

const initialState = {
  player: {},
  isLoggedIn: false,
};

const LOGIN_PLAYER = "LOGIN_PLAYER";
const LOGOUT_PLAYER = "LOGOUT_PLAYER";
const GET_PLAYER = "GET_PLAYER";

export function loginPlayer(player) {
  return {
    type: LOGIN_PLAYER,
    payload: player,
  };
}

export function logoutPlayer() {
  return {
    type: LOGOUT_PLAYER,
    payload: initialState,
  };
}

export function getPlayer() {
  const player = axios.get("/auth/player");
  return {
    type: GET_PLAYER,
    payload: player,
  };
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_PLAYER:
      return { ...state, player: action.payload, isLoggedIn: true };
    case LOGOUT_PLAYER:
      return { ...state, ...action.payload };
    case GET_PLAYER + "_PENDING":
      return state;
    case GET_PLAYER + "_FULFILLED":
      console.log(action)
      return { ...state, player: action.payload.data, isLoggedIn: true };
    case GET_PLAYER + "_REJECTED":
      return initialState;

    default:
      return state;
  }
}

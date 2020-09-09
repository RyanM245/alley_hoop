import axios from "axios";

const initialState = {
  game: [],
};

const GET_GAME = "GET_GAME"

export function getGame(){
    const game = axios.get("/games/getall")
    console.log(game)
    return{
        type: GET_GAME,
        payload: game,
      }
}
export default function(state = initialState, action){
    switch (action.type){
        case GET_GAME + "_PENDING":
      return state;
    case GET_GAME + "_FULFILLED":
      console.log(action)
      return { ...state, game: action.payload.data };
    case GET_GAME + "_REJECTED":
      return initialState;

    default:
      return state;
    }
}

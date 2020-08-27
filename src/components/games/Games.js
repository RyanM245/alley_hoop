import React, {useState, useEffect} from "react";
import Game from "../game/Game";
import axios from 'axios'

const Games = () => {
const [games,setGames] = useState([])


    useEffect(()=>{
axios.get('/games/getall').then((res) => {
    setGames(res.data);
  })
  .catch((err) => {
    console.log(err);
  });
    },[])


  const mappedGames = games.map((el, i) => {
    return <Game data={el} key={i} />;
  });

  return (
    <div>
      <div>
        <button>Schedule Game</button>
      </div>
      <div>
        <input />
        <button>Find Games</button>
      </div>
      <div>
        {mappedGames}
      </div>
    </div>
  );
};

export default Games;

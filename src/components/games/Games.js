import React, { useState, useEffect } from "react";
import Game from "../game/Game";
import axios from "axios";
import { Link } from "react-router-dom";


const Games = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios
      .get("/games/getall")
      .then((res) => {
        setGames(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const mappedGames = games.map((el, i) => {
    return <Game data={el} key={i} />;
  });

  return (
    <div>
      <div>
        <button><Link to= "/schedule">Schedule Game</Link></button>
      </div>
      <div>
        <input placeholder = "Search Games..." />
        <button>Find Games</button>
      </div>
      <div>{mappedGames}</div>
    </div>
  );
};

export default Games;

import React from "react";
import "./Game.css";

const Game = (props) => {
  return (
    <div className="game-holder">
      <h1 className='game-list'>Address: {props.data.address}</h1>
      <h1 className='game-list'>City: {props.data.city}</h1>
      <h1 className='game-list'>State: {props.data.state_abbrev}</h1>
      <h1 className='game-list'>Date: {props.data.date}</h1>
      <h1 className='game-list'>Time: {props.data.time}</h1>
    </div>
  );
};

export default Game;

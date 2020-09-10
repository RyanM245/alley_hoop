import React from "react";
import "./Game.css";

const Game = (props) => {
  console.log(props.data)
  return (
    <div className="game-holder">
      <div className="game-id-maker">
      <h1 className='game-list text'> {props.data.username}</h1>
       <img src={props.data.pic} className='game-img'/>
       </div>
      <h1 className='game-list text'>Address: {props.data.address}</h1>
      <h1 className='game-list text'>City: {props.data.city}</h1>
      <h1 className='game-list text'>State: {props.data.state_abbrev}</h1>
      <h1 className='game-list text'>Date: {props.data.date}</h1>
      <h1 className='game-list text'>Time: {props.data.time}</h1>
    </div>
  );
};

export default Game;

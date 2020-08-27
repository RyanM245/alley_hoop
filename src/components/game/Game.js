import React from "react";

const Game = (props) => {
  return (
    <div>
      <h1>Address: {props.data.address}</h1>
      <h1>City: {props.data.city}</h1>
      <h1>State: {props.data.state_abbrev}</h1>
      <h1>Date: {props.data.date}</h1>
      <h1>Time: {props.data.time}</h1>
    </div>
  );
};

export default Game;

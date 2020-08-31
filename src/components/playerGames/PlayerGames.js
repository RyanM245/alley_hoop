import React, {useState, useEffect} from "react";


const PlayerGames = (props) => {
  const [toggle, setToggle] = useState(false)


  
  return (
    <div>
      <div>
        <h1>Address: {props.data.address}</h1>
        <h1>City: {props.data.city}</h1>
        <h1>State: {props.data.state_abbrev}</h1>
        <h1>Date: {props.data.date}</h1>
        <h1>Time: {props.data.time}</h1>
      </div>
      <div>
        <button>Edit</button>
      </div>
    </div>
  );
};

export default PlayerGames;

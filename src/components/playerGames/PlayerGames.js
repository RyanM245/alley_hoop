import React from "react";
import { connect } from "react-redux";

const PlayerGames = (props) => {
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
        <img src={props.player.pic}/>
        <button>Edit</button>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Profile);


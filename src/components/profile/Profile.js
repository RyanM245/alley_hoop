import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";

const Profile = (props) => {
  const [games, setGames] = useState([]);
  useEffect(() => {
    console.log(props.player)
    axios
      .get(`/games/playergames/${props.player.playerId}`)
      .then((res) => {
        setGames(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>MyProfile</h1>
      <div>
        <img src= {props.player.pic}/>
        <button>Edit Pic</button>
      </div>
      <div>
  <h2>Username:{props.player.username}</h2>
  <h2>Email:{props.player.email}</h2>
    
        <button>Edit info</button>
        <button>Save</button>
      </div>
      <h1>My Scheduled Games</h1>
      <div></div>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Profile);

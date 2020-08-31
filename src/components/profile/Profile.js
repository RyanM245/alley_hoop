import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import PlayerGames from "../playerGames/PlayerGames";

const Profile = (props) => {
  const [games, setGames] = useState([]);
  const [username, setUsername] = useState(props.player.username);
  const [email, setEmail] = useState(props.player.email);
  const [pic, setPic] = useState(props.player.pic);
  const [proToggle, setProToggle] = useState(false);

  const handleUsernameInput = (e) => {
    setUsername(e.target.value);
  };
  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };
  const handlePicInput = (e) => {
    setPic(e.target.value);
  };

  useEffect(() => {
    // console.log(props);
    if (props.player.playerId) {
      axios
        .get(`/games/playergames/${props.player.playerId}`)
        .then((res) => {
          setGames(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [props.player.playerId]);

  const saveEdit = (id, username, email, pic) => {
    // console.log(id);
    axios
      .put(`/auth/player/${id}`, { username, email, pic })
      .then((res) => {
        setUsername(res.data.username);
        setEmail(res.data.email);
        setPic(res.data.pic);
        // console.log(res.data);
        setProToggle(!proToggle)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const mappedPlayerGames = games.map((el, i) => {
    return <PlayerGames data={el} key={i} />;
  });

  return (
    <div>
      <h1>MyProfile</h1>
      <div>
        {!proToggle ? (
          <div>
            <div>
              <img alt="Profile Pic" src={pic} />
            </div>
            <div>
              <h2>Username:{username}</h2>
              <h2>Email:{email}</h2>
              <button onClick={() => setProToggle(!proToggle)}>
                Edit Profile
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div>
              <input
                name="pic"
                placeholder="New Profile Pic URL..."
                value={pic}
                onChange={handlePicInput}
              />
              <input
                name="username"
                placeholder="New Username"
                value={username}
                onChange={handleUsernameInput}
              />
              <input
                name="email"
                placeholder="New Email"
                value={email}
                onChange={handleEmailInput}
              />
            </div>
            <button  onClick={()=>saveEdit(props.player.playerId, username, email, pic)} >Save</button>
            <button onClick={() => setProToggle(!proToggle)}>Go Back</button>
          </div>
        )}
      </div>
      <h1>My Scheduled Games</h1>
      <div>{mappedPlayerGames}</div>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Profile);
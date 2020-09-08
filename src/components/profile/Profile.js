import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import PlayerGames from "../playerGames/PlayerGames";
import { loginPlayer } from "../../ducks/reducer";
import "./Profile.css";
import Aws from '../AWS/Aws'

const Profile = (props) => {
  const [games, setGames] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState("");
  const [proToggle, setProToggle] = useState(false);

  useEffect(() => {
    setUsername(props.reducer.player.username);
    setEmail(props.reducer.player.email);
    setPic(props.reducer.player.pic);
  }, [props.reducer.player]);
  // console.log(props)

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
    if (props.reducer.player.playerId) {
      getPlayerGames();
    }
  }, [props.reducer.player.playerId]);

  const getPlayerGames = () => {
    axios
      .get(`/games/playergames/${props.reducer.player.playerId}`)
      .then((res) => {
        setGames(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const saveEdit = (id, username, email, pic) => {
    // console.log(id);
    axios
      .put(`/auth/player/${id}`, { username, email, pic })
      .then((res) => {
        props.loginPlayer(res.data);
        setProToggle(!proToggle);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteGame = (id) => {
    axios
      .delete(`/games/player/${id}`)
      .then((res) => {
        getPlayerGames();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const mappedPlayerGames = games.map((el, i) => {
    return <PlayerGames data={el} key={el.game_id} deleteGame={deleteGame} />;
  });

  return (
    <div className="profile-main">
      <h1 className="sch-greeting">MyProfile</h1>
      <div className="myProfile">
        {!proToggle ? (
          <div className="pro-info">
            <img alt="Profile Pic" src={pic} className="pro-img" />

            <h2 className='text'>Username:{username}</h2>
            <h2 className='text'>Email:{email}</h2>

            <button onClick={() => setProToggle(!proToggle)}>
              Edit Profile
            </button>
          </div>
        ) : (
          <div className="pro-info">
            <div className='pro-in'>
            <Aws setPic={setPic} />
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
            <div className='pro-btn'>
            <button
              onClick={() =>
                saveEdit(props.reducer.player.playerId, username, email, pic)
              }
            >
              Save
            </button>
            <button onClick={() => setProToggle(!proToggle)}>Go Back</button>
            </div>
          </div>
        )}
      </div>
      <h1 className="sch-greeting">My Scheduled Games</h1>
      <div>{mappedPlayerGames}</div>
    </div>
  );
};

const mapStateToProps = (state) => state;
// const mapStateToProps = (state) => ({player: state.reducer.player});

export default connect(mapStateToProps, { loginPlayer })(Profile);

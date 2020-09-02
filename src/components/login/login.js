import React, { useState } from "react";
import axios from "axios";
import { loginPlayer } from "../../ducks/reducer";
import { connect } from "react-redux";
import "./Login.css"


const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState("");
  const [toggle, setToggle] = useState(true);

  const handleUsernameInput = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };
  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };
  const handlePicInput = (e) => {
    setPic(e.target.value);
  };

  const login = () => {
    axios
      .post("/auth/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        props.loginPlayer();
        props.history.push("/games");
      })
      .catch((err) => {
        alert("username or password incorrect");
      });
  };

  const register = () => {
    axios
      .post("/auth/register", {
        username: username,
        password: password,
        email: email,
        pic: pic,
      })
      .then((res) => {
        props.loginPlayer();
        props.history.push("/games");
      })
      .catch((err) => {
        alert("email already registered, do you want to log in?");
      });
  };

  return (
    <div>
      <h1>Welcome to Alley-Hoop</h1>
      {toggle ? (
        <div>
          <input
            name="username"
            placeholder="Username"
            value={username}
            onChange={handleUsernameInput}
          />
          <input
            name="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordInput}
            type="password"
          />
        </div>
      ) : (
        <div>
          <input
            name="username"
            placeholder="Username"
            value={username}
            onChange={handleUsernameInput}
          />
          <input
            name="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordInput}
            type="password"
          />
          <input
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailInput}
          />
          <input
            name="pic"
            placeholder="Profile Pic URL"
            value={pic}
            onChange={handlePicInput}
          />
        </div>
      )}
      <div>
        {toggle ? (
          <>
            <button onClick={login}>Login</button>
            <button
              onClick={() => {
                setToggle(!toggle);
              }}
            >
              Signup
            </button>
          </>
        ) : (
          <>
            <button onClick={register}>Register</button>
            <button
              onClick={() => {
                setToggle(!toggle);
              }}
            >
              Go Back
            </button>
          </>
        )}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { loginPlayer })(Login);

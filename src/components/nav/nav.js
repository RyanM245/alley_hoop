import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutPlayer, getPlayer } from "../../ducks/reducer";
import axios from "axios";

const Nav = (props) => {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    props.getPlayer();
  },[]);

  const logout = () => {
    axios
      .get("/auth/logout")
      .then((res) => {
        props.logoutPlayer();
        props.history.push("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <img
        alt="Logo"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSilC7N-AsDXEGBNiKpMdTxUehiR-_kF9tvLg&usqp=CAU"
      />
      <h1>Alley-Hoop</h1>
      <div onClick={() => setToggle(!toggle)}>&#9776;</div>
      {toggle ? (
        <nav>
          <span onClick = {()=>setToggle(!toggle)}>
            <Link to="/games">Home</Link>
          </span>
          <span onClick = {()=>setToggle(!toggle)}>
            <Link to="/profile">Profile</Link>
          </span>
          <span onClick={logout}>
            <Link to="/">Logout</Link>
          </span>
        </nav>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { logoutPlayer, getPlayer })(Nav);

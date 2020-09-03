import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutPlayer, getPlayer } from "../../ducks/reducer";
import axios from "axios";
import "./Nav.css";
import MenuIcon from "../MenuIcon";

const Nav = (props) => {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    props.getPlayer();
  }, []);

  const logout = () => {
    axios
      .get("/auth/logout")
      .then((res) => {
        props.logoutPlayer();
        // props.history.push("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="nav-main">
      <img
        className="logo-img"
        alt="Logo"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSilC7N-AsDXEGBNiKpMdTxUehiR-_kF9tvLg&usqp=CAU"
      />
      <h1 className="head-text">Alley-Hoop</h1>
      <div className="ham-menu" onClick={() => setToggle(!toggle)}>
        <MenuIcon />
      </div>
      {toggle ? (
        <nav className="mobile-toggle">
          <span onClick={() => setToggle(!toggle)}>
            <Link className="mo" to="/games">
              Home
            </Link>
          </span>
          <span onClick={() => setToggle(!toggle)}>
            <Link className="mo" to="/profile">
              Profile
            </Link>
          </span>
          <span onClick={logout}>
            <Link className="mo" to="/">
              Logout
            </Link>
          </span>
        </nav>
      ) : null}
      <div className="desktop-menu">
        <Link className="d-mo" to="/games">
          Home
        </Link>
        <Link className="d-mo" to="/profile">
          Profile
        </Link>
        <Link className="d-mo" to="/">
          Logout
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { logoutPlayer, getPlayer })(Nav);

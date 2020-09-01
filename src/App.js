import React, {useEffect} from "react";
import "./App.css";
import "./reset.css";
import routes from "./routes";
import Nav from "./components/nav/Nav";
import { useLocation } from "react-router-dom";
import {connect} from "react-redux"
import {getPlayer} from "./ducks/reducer" 

const App= (props)=> {
  const {pathname}= useLocation();
useEffect(()=>{
props.getPlayer()
},[])

  return (
    <div className="App">
      {pathname !== "/" ? <Nav /> : null}
      {routes}
    </div>
  );
}
const mapStateToProps = (state) => state;

export default connect(mapStateToProps, {getPlayer})(App);

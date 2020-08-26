import React from "react";
import "./App.css";
import "./reset.css";
import routes from './routes'
import Nav from './components/nav/nav'
import {withRouter} from 'react-router-dom'

function App(props) {
  return <div className="App">
   {props.location.pathname !== '/' ? 
      <Nav /> : null}
      {routes}

  </div>;
}

export default withRouter(App);

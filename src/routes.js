import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from './components/login/login'
import Games from './components/games/Games'
import Profile from './components/profile/Profile'
import Schedule from './components/schedule/Schedule'

export default (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route path="/games" component={Games} />
    <Route path="/profile" component={Profile} />
    <Route path="/schedule" component={Schedule} />
  </Switch>
);
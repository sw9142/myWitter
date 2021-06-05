import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Nav from "../routes/Nav";
import Profile from "../routes/Profile";

export default function AppRouter({ isLoggedIn, UserInfo, refreshUser }) {
  return (
    <Router>
      {isLoggedIn && <Nav />}

      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home UserInfo={UserInfo} />
            </Route>
            <Route exact path="/profile">
              <Profile UserInfo={UserInfo} refreshUser={refreshUser} />
            </Route>
          </>
        ) : (
          <Route exact path="/">
            <Auth />
          </Route>
        )}
      </Switch>
    </Router>
  );
}

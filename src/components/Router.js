import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Nav from "../routes/Nav";
import Profile from "../routes/Profile";

export default function AppRouter({ isLoggedIn, UserInfo, refreshUser }) {
  console.log("UserInfo.displayName in Router: ", UserInfo);
  return (
    <Router>
      {isLoggedIn && <Nav UserInfo={UserInfo} />}

      <Switch>
        {isLoggedIn ? (
          <div
            style={{
              maxWidth: 890,
              width: "100%",
              margin: "0 auto",
              marginTop: 80,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Route exact path="/">
              <Home UserInfo={UserInfo} />
            </Route>
            <Route exact path="/profile">
              <Profile UserInfo={UserInfo} refreshUser={refreshUser} />
            </Route>
          </div>
        ) : (
          <Route exact path="/">
            <Auth />
          </Route>
        )}
      </Switch>
    </Router>
  );
}

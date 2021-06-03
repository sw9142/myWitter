import React, { useState, useEffect } from "react";
import AppRouter from "./Router";
import { authService } from "../fbase";

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(authService.currentUser);
  const [Init, setInit] = useState(false);
  const [UserInfo, setUserInfo] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setisLoggedIn(true);
        setUserInfo(user);
      } else {
        setisLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {Init ? (
        <AppRouter isLoggedIn={isLoggedIn} UserInfo={UserInfo} />
      ) : (
        "Loading..."
      )}
      <footer>&copy; Naomi Choi_myWitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;

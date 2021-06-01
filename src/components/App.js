import React, { useState, useEffect } from "react";
import AppRouter from "./Router";
import { authService } from "../fbase";

function App() {
  console.log("current User?: ", authService.currentUser);
  const [isLoggedIn, setisLoggedIn] = useState(authService.currentUser);
  const [Init, setInit] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setisLoggedIn(true);
      } else {
        setisLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {Init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Loading..."}
      <footer>&copy; Naomi Choi_myWitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;

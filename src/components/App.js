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
        setUserInfo({
          uid: user.uid,
          displayName: user.displayName,
          updateProfile: (arg) => user.updateProfile(arg),
        });
      } else {
        setisLoggedIn(false);
        setUserInfo(null);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserInfo({
      uid: user.uid,
      displayName: user.displayName,
      updateProfile: (arg) => user.updateProfile(arg),
    });
  };

  return (
    <>
      {Init ? (
        <AppRouter
          isLoggedIn={isLoggedIn}
          UserInfo={UserInfo}
          refreshUser={refreshUser}
        />
      ) : (
        "Loading..."
      )}
      <footer>&copy; Naomi Choi_myWitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;

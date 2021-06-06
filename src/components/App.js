import React, { useState, useEffect } from "react";
import AppRouter from "./Router";
import { authService } from "../fbase";

function App() {
  const [Init, setInit] = useState(false);
  const [UserInfo, setUserInfo] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserInfo({
          uid: user.uid,
          displayName: user.displayName,
          updateProfile: (arg) => user.updateProfile(arg),
        });
      } else {
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
          isLoggedIn={Boolean(UserInfo)}
          UserInfo={UserInfo}
          refreshUser={refreshUser}
        />
      ) : (
        "Loading..."
      )}
    </>
  );
}

export default App;

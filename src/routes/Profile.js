import React from "react";
import { useHistory } from "react-router-dom";
import { authService } from "../fbase";

export default function Profile() {
  const history = useHistory();
  const onLogout = () => {
    authService.signOut();
    history.push("/");
  };

  return (
    <>
      profile page
      <button onClick={onLogout}>Logout</button>
    </>
  );
}

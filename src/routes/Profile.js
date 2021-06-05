import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { authService } from "../fbase";

export default function Profile({ UserInfo, refreshUser }) {
  const [ProfileUpdate, setProfileUpdate] = useState(UserInfo.displayName);

  const history = useHistory();
  const onLogout = () => {
    authService.signOut();
    history.push("/");
  };

  const onUpdateProfile = (e) => {
    setProfileUpdate(e.target.value);
  };

  const onUpdateSubmit = async () => {
    if (UserInfo.displayName !== ProfileUpdate) {
      await UserInfo.updateProfile({
        displayName: ProfileUpdate,
      });
      refreshUser();
    }
  };

  return (
    <>
      {UserInfo.displayName}'s Profile Page
      <>
        <form>
          <input type="text" value={ProfileUpdate} onChange={onUpdateProfile} />
          <button onClick={onUpdateSubmit}>Update Profile</button>
        </form>
      </>
      <button onClick={onLogout}>Logout</button>
    </>
  );
}

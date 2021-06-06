import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { authService } from "../fbase";

export default function Profile({ UserInfo, refreshUser }) {
  const [ProfileUpdate, setProfileUpdate] = useState(UserInfo.displayName);
  console.log("UserInfo.displayName in Profile: ", UserInfo.displayName);

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
    <div className="container">
      <div className="profileTitle">
        {" "}
        {UserInfo.displayName}'s Profile Page{" "}
      </div>

      <>
        <form className="profileForm">
          <input
            type="text"
            value={ProfileUpdate}
            onChange={onUpdateProfile}
            autoFocus
            className="formInput"
          />
          <button
            onClick={onUpdateSubmit}
            className="formBtn"
            style={{
              marginTop: 10,
            }}
          >
            Update Profile
          </button>
        </form>
      </>
      <button className="formBtn cancelBtn logOut" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}

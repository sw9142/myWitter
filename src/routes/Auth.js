import React, { useState } from "react";
import { authService, firebaseInstance } from "../fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

import AuthForm from "./AuthForm";

export default function Auth() {
  const onSocialHandler = async (e) => {
    let provider;
    const { name } = e.target;

    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider).catch((err) => {
      console.log("Err: ", err);
    });
  };
  return (
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />

      <AuthForm />

      <div className="authBtns">
        <button name="google" onClick={onSocialHandler} className="authBtn">
          Continue with Google <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button name="github" onClick={onSocialHandler} className="authBtn">
          Continue with Github <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { authService } from "../fbase";
import { firebaseInstance } from "../fbase";

export default function Auth() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [NewUser, setNewUser] = useState(true);
  const [Msg, setMsg] = useState("");

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "Email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  const onSubmitHandler = async (e) => {
    let data;
    e.preventDefault();

    try {
      if (NewUser) {
        setNewUser(false);
        data = await authService.createUserWithEmailAndPassword(
          Email,
          Password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(Email, Password);
      }

      console.log("newUer?: ", NewUser);
    } catch (err) {
      if (err) {
        console.log("err: ", err);
        setMsg(err.message);
      }
    }
  };

  const onSocialHandler = async (e) => {
    let provider;
    const { name } = e.target;

    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);
  };
  return (
    <>
      Auth Page
      <div style={{ color: "red", fontSize: "0.9rem" }}>{Msg}</div>
      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          name="Email"
          placeholder="Email"
          onChange={onChangeHandler}
          value={Email}
        />
        <input
          type="text"
          name="Password"
          placeholder="Passoword"
          onChange={onChangeHandler}
          value={Password}
        />
        {NewUser ? (
          <button type="submit">Sign up</button>
        ) : (
          <button type="submit">Login</button>
        )}
      </form>
      <div>
        <button name="google" onClick={onSocialHandler}>
          Continue with Google
        </button>
        <button name="github" onClick={onSocialHandler}>
          Continue with Github
        </button>
      </div>
    </>
  );
}

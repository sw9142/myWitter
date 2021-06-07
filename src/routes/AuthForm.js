import React, { useState, useEffect } from "react";
import { authService } from "../fbase";

function AuthForm({ msg }) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [NewUser, setNewUser] = useState(true);
  const [Msg, setMsg] = useState("");

  useEffect(() => {
    setMsg(msg);
  }, []);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "Email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (NewUser) {
        await authService.createUserWithEmailAndPassword(Email, Password);
      } else {
        await authService.signInWithEmailAndPassword(Email, Password);
      }
    } catch (err) {
      if (err) {
        console.log("err: ", err);
        setMsg(err.message);
      }
    }
  };

  const toggleAccount = () => {
    console.log("am i?");
    setNewUser((prev) => !prev);
  };

  return (
    <>
      <form onSubmit={onSubmitHandler} className="container">
        <input
          type="text"
          name="Email"
          placeholder="Email"
          required
          onChange={onChangeHandler}
          value={Email}
          className="authInput"
        />
        <input
          type="password"
          name="Password"
          placeholder="Passoword"
          required
          onChange={onChangeHandler}
          value={Password}
          className="authInput"
        />
        <input
          type="submit"
          className="authInput authSubmit"
          value={NewUser ? "Create Account" : "Sign In"}
        />
        <div className="authError">{Msg}</div>
      </form>

      <span onClick={toggleAccount} className="authSwitch">
        {NewUser ? "Sign In" : "Create Account"}
      </span>
    </>
  );
}

export default AuthForm;

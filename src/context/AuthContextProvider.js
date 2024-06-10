import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

import { useNavigate } from "react-router-dom";
import fire from "../fire";
export const authContext = createContext();
export const useAuth = () => useContext(authContext);
const AuthContextProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState("");
  const navigate = useNavigate();
  const cleareInputs = () => {
    setEmail("");
    setPassword("");
  };
  const clearsErrors = () => {
    setEmailError("");
    setPasswordError("");
  };
  //! REGISTER
  const handleRegister = () => {
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        setHasAccount(!hasAccount);
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(error.message);
            break;
          case "auth/weak-password":
            setPasswordError(error.message);
          default:
            break;
        }
      });
    cleareInputs();
    clearsErrors();
  };
  //! LOGIN
  const handleLogin = () => {
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => navigate("/"))
      .catch((error) => {
        switch (error.code) {
          case "auth/user-disabled":
          case "auth/invalid-email":
          case "auth/user-not-found":
            setEmailError(Object.values(error.code));
            break;
          case "auth/wrong-password":
            setPasswordError(Object.values(error.code.message));
            break;
          default:
            break;
        }
      });
    cleareInputs();
    clearsErrors();
  };
  //! LOGOUT
  const handleLogOut = () => {
    fire.auth().signOut();
  };
  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser("");
      }
    });
  };
  useEffect(() => {
    authListener();
  }, []);
  const values = {
    email,
    password,
    emailError,
    passwordError,
    setEmail,
    setPassword,
    setEmailError,
    setPasswordError,
    user,
    setUser,
    handleRegister,
    handleLogin,
    handleLogOut,
    clearsErrors,
    cleareInputs,
    hasAccount,
    setHasAccount,
    authListener,
  };
  return <authContext.Provider value={values}>{children}</authContext.Provider>;
};

export default AuthContextProvider;

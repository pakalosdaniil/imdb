import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fire from "../fire";

export const authContext = React.createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  function signUp(email, password) {
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        setCurrentUser(user);
        navigate("/");
        return user;
      })
      .catch(error => setError(error.message));
  }

  function logIn(email, password) {
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        setCurrentUser(user);
        navigate("/");
        return user;
      })
      .catch(error => setError(error.message));
  }

  function logOut() {
    fire
      .auth()
      .signOut()
      .then(() => {
        setCurrentUser("");
        navigate("/");
      });
  }

  function autListener() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser("");
      }
    });
  }

  useEffect(autListener, []);

  return (
    <authContext.Provider value={(currentUser, error, signUp, logIn, logOut)}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;

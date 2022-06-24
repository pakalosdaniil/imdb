import React, { useEffect, useState } from "react";
import fire from "../fire";

export const authContext = React.createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");
  const [error, setError] = useState(false);
  const [admin, setAdmin] = useState(false);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  function signUp(email, password, navigate) {
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

  function logIn(email, password, navigate) {
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

  function logOut(navigate) {
    fire
      .auth()
      .signOut()
      .then(() => {
        setCurrentUser("");
        navigate("/");
      });
  }

  function authListener() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        if (user.email === "admin@gmail.com") {
          setAdmin(true);
        }
        setCurrentUser(user);
      } else {
        setCurrentUser("");
        setAdmin(false);
      }
    });
  }

  useEffect(authListener, []);

  return (
    <authContext.Provider
      value={{ currentUser, error, admin, signUp, logIn, logOut }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;

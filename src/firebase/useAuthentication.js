import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { auth, data } from "./config";
import { useAuthContext } from "./useAuthContext";

export const useAuthentication = () => {
  const [error, setError] = useState(null);

  const { dispatch } = useAuthContext();

  const signup = ({ email, password, firstName, lastName }) => {
    setError(null);
    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        const user = response.user;
        const docRef = doc(data, "users", user.uid);
        setDoc(docRef, {
          firstName,
          lastName,
          todoList: [],
          completedList: [],
          favouriteList: [],
          flaggedList: []
        });
        dispatch({ type: "LOGIN", payload: user, login: true });
        console.log("Signin Succesfull", user.uid);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const login = ({ email, password }) => {
    setError(null);
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        const user = response.user;
        console.log("Login Successfull", user.uid);
        dispatch({ type: "LOGIN", payload: user, login: true });
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const logout = () => {
    signOut(auth)
      .then((response) => {
        console.log("LoggedOut SuccesFully");
        dispatch({ type: "LOGOUT", login: false });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return { signup, error, login, logout };
};

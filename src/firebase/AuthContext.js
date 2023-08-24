import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useReducer } from "react";
import { auth } from "./config";

export const AuthContext = createContext();

const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload, isLogin: action.login };
    case "LOGOUT":
      return { ...state, user: null, isLogin: action.login };
    case "IS_AUTH_READY":
      return {
        ...state,
        user: action.payload,
        isAuthReady: true
      };
    case "DATA-FETCH":
      return {
        ...state,
        isDataFetched: action.data
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, {
    user: null,
    isAuthReady: false,
    isDataFetched: false,
    isLogin: false
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      dispatch({ type: "IS_AUTH_READY", payload: user, loginstatus: true });
      unsub();
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

import "./styles.css";
import Nav from "./Nav";
import Main from "./Main";
import React, { useEffect, useState } from "react";
import Login from "./Login";
import Loader from "./Loader";
import { useFetch } from "./firebase/useFetch";
import { useAuthContext } from "./firebase/useAuthContext";
import { useFirestore } from "./firebase/useFirestore";

export default function App() {
  const { user, isAuthReady, isDataFetched } = useAuthContext();
  const { updateDocument, error } = useFirestore("users");

  const [currentUser, setCurrentUser] = useState(null);
  const [todoList, setTodoList] = useState([]);
  const [isCompleted, setIsCompleted] = useState([]);
  const [isFav, setIsFav] = useState([]);
  const [isFlagged, setIsFlagged] = useState([]);
  const [isEditing, setIsEditing] = useState(-1);
  const [loginState, setLoginState] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);

  // userData

  const userData = useFetch("users");

  useEffect(() => {
    if ((!isAuthReady || !user) && !isLoading) {
      let timer = setTimeout(() => {
        setLoginState(true);
      }, 500);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [isAuthReady, isLoading]);

  //FirebaseDataRetrive

  useEffect(() => {
    if (isDataFetched) {
      console.log("Updating data");
      updateDocument(user.uid, {
        completedList: isCompleted,
        todoList: todoList,
        flaggedList: isFlagged,
        favouriteList: isFav
      });
    }
  }, [isCompleted, todoList, isFav, isFlagged, isEditing]);

  useEffect(() => {
    if (loginState) {
      setTodoList([]);
      setIsCompleted([]);
      setIsFav([]);
      setIsFlagged([]);
    }
  }, [loginState]);

  useEffect(() => {
    if (userData.documents !== null && !loginState) {
      console.log("Data Retrived");
      setCurrentUser(userData.documents.firstName);
      setTodoList(userData.documents.todoList);
      setIsCompleted(userData.documents.completedList);
      setIsFlagged(userData.documents.flaggedList);
      setIsFav(userData.documents.favouriteList);
    }
    if (isLoading) {
      let timer = setTimeout(() => {
        setIsLoading(false);
      }, 2500);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [isDataFetched]);

  console.log("Data Fetched:", isDataFetched);

  //FirebaseDataRetrive
  return (
    (isLoading && <Loader />) || (
      <div
        className="App"
        style={{
          color: isDark ? "white" : "#333",
          backgroundColor: isDark ? "#333" : "white"
        }}
      >
        <Nav
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          isDark={isDark}
          setIsDark={setIsDark}
          setLoginState={setLoginState}
        />
        <Main
          todoList={todoList}
          setTodoList={setTodoList}
          isCompleted={isCompleted}
          setIsCompleted={setIsCompleted}
          isFav={isFav}
          setIsFav={setIsFav}
          isFlagged={isFlagged}
          setIsFlagged={setIsFlagged}
          isDark={isDark}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          isDataFetched={isDataFetched}
          loginState={loginState}
          currentUser={currentUser}
        />
        {loginState && (
          <Login
            setLoginState={setLoginState}
            setCurrentUser={setCurrentUser}
          />
        )}
      </div>
    )
  );
}

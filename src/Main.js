import React, { useEffect, useState } from "react";
import Select from "./Select";
import List from "./List";
import Form from "./Form";
import LoaderBook from "./LoaderBook";

function Main({
  todoList,
  setTodoList,
  isDark,
  isCompleted,
  setIsCompleted,
  isFav,
  setIsFav,
  isFlagged,
  setIsFlagged,
  isEditing,
  setIsEditing,
  isDataFetched,
  loginState,
  currentUser
}) {
  const [input, setInput] = useState("");
  const [sortList, setSortList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log("Loading", isLoading);

  useEffect(() => {
    if (currentUser === "User") {
      setIsLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    if (!isDataFetched && !loginState) {
      if (currentUser !== "User") {
        setIsLoading(true);
      }
    }
    if (isDataFetched) {
      let timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isDataFetched, loginState]);

  useEffect(() => {
    setSortList([...todoList]);
  }, [todoList, isEditing]);

  return (
    <main className="main">
      <Form
        setTodoList={setTodoList}
        isEditing={isEditing}
        input={input}
        setInput={setInput}
        isDark={isDark}
      />
      <Select
        todoList={todoList}
        setSortList={setSortList}
        isCompleted={isCompleted}
        isFav={isFav}
        isFlagged={isFlagged}
        isDark={isDark}
      />
      {(isLoading && (
        <div className="loaderBookDiv">
          <LoaderBook />
        </div>
      )) || (
        <div className="listContainer">
          {(todoList.length > 0 && sortList.length > 0 && (
            <List
              todoList={todoList}
              setTodoList={setTodoList}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              isCompleted={isCompleted}
              setIsCompleted={setIsCompleted}
              isFav={isFav}
              setIsFav={setIsFav}
              isDark={isDark}
              sortList={sortList}
              isFlagged={isFlagged}
              setIsFlagged={setIsFlagged}
            />
          )) || (
            <div style={{ fontWeight: "bold" }}>
              {sortList.length <= 0 && todoList.length <= 0
                ? "No Task to do, Enjoy Your Day 🍸"
                : "No Task Found in Selected Catogory"}
            </div>
          )}
        </div>
      )}
    </main>
  );
}

export default Main;

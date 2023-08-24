import React, { useEffect } from "react";
import Button from "./Button";

function Select({
  todoList,
  setSortList,
  isCompleted,
  isFav,
  isFlagged,
  isDark
}) {
  const [sortMode, setSortMode] = React.useState("all");

  function handlesorting(e) {
    setSortMode(e.target.value);
    handlesetsorting();
  }

  useEffect(() => {
    handlesetsorting();
  }, [sortMode]);

  function handlesetsorting() {
    setSortList([]);
    if (sortMode === "completed") {
      todoList.map((task, idx) => {
        if (isCompleted.includes(idx)) {
          setSortList((prev) => [...prev, task]);
        }
      });
    } else if (sortMode === "pending") {
      todoList.map((task, idx) => {
        if (!isCompleted.includes(idx)) {
          setSortList((prev) => [...prev, task]);
        }
      });
    } else if (sortMode === "fav") {
      todoList.map((task, idx) => {
        if (isFav.includes(idx)) {
          setSortList((prev) => [...prev, task]);
        }
      });
    } else if (sortMode === "flag") {
      todoList.map((task, idx) => {
        if (isFlagged.includes(idx)) {
          setSortList((prev) => [...prev, task]);
        }
      });
    } else {
      setSortList([...todoList]);
    }
  }

  return (
    <>
      <select
        title="SortTask"
        className="select"
        onChange={(e) => handlesorting(e)}
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
        <option value="fav">Favourite</option>
        <option value="flag">Important</option>
      </select>
    </>
  );
}

export default Select;

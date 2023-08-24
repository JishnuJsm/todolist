import React from "react";
import Button from "./Button";

function Form({ setTodoList, isEditing, input, setInput, isDark }) {
  function handleSubmit(e) {
    e.preventDefault();
    if (input.trim() !== "") {
      setTodoList((data) => [...data, input]);
      setInput("");
    } else {
      alert("Please Enter Valid Task");
    }
  }
  function handleClick() {}
  return (
    <form onSubmit={(e) => handleSubmit(e)} className="form">
      <input
        type="text"
        placeholder="Enter your task here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{
          backgroundColor: isDark ? "wheat" : "#999",
          color: isDark ? "coral" : "wheat"
        }}
      />
      <Button onClick={handleClick} isEditing={isEditing} isDark={isDark}>
        Add Task
      </Button>
    </form>
  );
}

export default Form;

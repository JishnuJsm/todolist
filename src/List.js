import React, { useEffect, useState } from "react";
import Button from "./Button";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";

function List({
  todoList,
  setTodoList,
  isEditing,
  setIsEditing,
  isCompleted,
  setIsCompleted,
  isDark,
  sortList,
  isFav,
  setIsFav,
  isFlagged,
  setIsFlagged
}) {
  const [editingInput, setEditingInput] = useState("");
  const [isFavHover, setIsFavHover] = useState(false);
  const [isFlagHover, setIsFlagHover] = useState(false);

  useEffect(() => {
    setIsCompleted(() => isCompleted.filter((list) => list >= 0));
    setIsFlagged(() => isFlagged.filter((list) => list >= 0));
    setIsFav(() => isFav.filter((list) => list >= 0));
  }, [todoList]);

  function handleDelete(e, idx) {
    setTodoList(() => todoList.filter((list, id) => id !== idx));
    setIsCompleted(() =>
      isCompleted.map((index) => {
        if (index === idx) {
          return -1;
        }
        if (index > idx) {
          return index - 1;
        }
        return index;
      })
    );
    setIsFav(() =>
      isFav.map((index) => {
        if (index === idx) {
          return -1;
        }
        if (index >= idx) {
          return index - 1;
        }
        return index;
      })
    );
    setIsFlagged(() =>
      isFlagged.map((index) => {
        if (index === idx) {
          return -1;
        }
        if (index >= idx) {
          return index - 1;
        }
        return index;
      })
    );
    setIsEditing(-1);
  }
  function handleEdit(e, idx) {
    if (!isCompleted.includes(idx)) {
      if (isEditing === -1) {
        setEditingInput(todoList[idx]);
        setIsEditing(idx);
      } else {
        if (isEditing !== idx) {
          todoList[isEditing] = editingInput;
          setTodoList(todoList);
          setEditingInput(todoList[idx]);
          setIsEditing(idx);
        }
        if (editingInput && isEditing === idx) {
          todoList[idx] = editingInput;
          setTodoList(todoList);
          setIsEditing(-1);
        }
      }
    }
  }

  function handleSubmit(e, idx) {
    e.preventDefault();
    if (editingInput) {
      todoList[idx] = editingInput;
      setTodoList(todoList);
      setIsEditing(-1);
    }
  }
  function handleComplete(e, idx) {
    setIsCompleted(() =>
      isCompleted.includes(idx)
        ? [...isCompleted.filter((list) => list !== idx)]
        : [...isCompleted, idx]
    );
  }

  function handleFavourite(e, idx) {
    setIsFav(() =>
      isFav.includes(idx)
        ? [...isFav.filter((list) => list !== idx)]
        : [...isFav, idx]
    );
  }

  function handleFlagged(e, idx) {
    setIsFlagged(() =>
      isFlagged.includes(idx)
        ? [...isFlagged.filter((list) => list !== idx)]
        : [...isFlagged, idx]
    );
  }
  return (
    <ul>
      {todoList.map(
        (list, idx) =>
          sortList.includes(list) && (
            <li
              style={{
                borderBottom: `1px solid ${isDark ? "wheat" : "#333"}`
              }}
              key={idx}
            >
              {isEditing === idx ? (
                <>
                  <p
                    onMouseOver={() => setIsFavHover(idx)}
                    onMouseOut={() => setIsFavHover(false)}
                    onClick={(e) => {
                      handleFavourite(e, idx);
                    }}
                  >
                    {isFavHover === idx || isFav.includes(idx) ? (
                      <StarRoundedIcon className="fav" />
                    ) : (
                      <StarBorderRoundedIcon className="fav" />
                    )}
                  </p>
                  <p
                    onMouseOver={() => setIsFlagHover(idx)}
                    onMouseOut={() => setIsFlagHover(false)}
                    onClick={(e) => {
                      handleFlagged(e, idx);
                    }}
                  >
                    {isFlagHover === idx || isFlagged.includes(idx) ? (
                      <FlagRoundedIcon className="flagged" />
                    ) : (
                      <FlagOutlinedIcon className="flagged" />
                    )}
                  </p>
                  <form
                    onSubmit={(e) => handleSubmit(e, idx)}
                    style={{ width: "90%" }}
                  >
                    <input
                      placeholder="Task can't be Null"
                      value={editingInput}
                      onChange={(e) => setEditingInput(e.target.value)}
                      autoFocus
                      style={{
                        fontSize: "1rem",
                        width: "80%",
                        color: isDark ? "orange" : "blue",
                        backgroundColor: isDark ? "#333" : "#fff"
                      }}
                    />
                  </form>
                </>
              ) : (
                <>
                  <p
                    onMouseOver={() => setIsFavHover(idx)}
                    onMouseOut={() => setIsFavHover(false)}
                    onClick={(e) => {
                      handleFavourite(e, idx);
                    }}
                  >
                    {isFavHover === idx || isFav.includes(idx) ? (
                      <StarRoundedIcon className="fav" />
                    ) : (
                      <StarBorderRoundedIcon className="fav" />
                    )}
                  </p>
                  <p
                    onMouseOver={() => setIsFlagHover(idx)}
                    onMouseOut={() => setIsFlagHover(false)}
                    onClick={(e) => {
                      handleFlagged(e, idx);
                    }}
                  >
                    {isFlagHover === idx || isFlagged.includes(idx) ? (
                      <FlagRoundedIcon className="flagged" />
                    ) : (
                      <FlagOutlinedIcon className="flagged" />
                    )}
                  </p>
                  <p
                    className="todoActivity"
                    style={{
                      textDecoration: isCompleted.includes(idx)
                        ? "line-through"
                        : "none",
                      cursor: "pointer",
                      display: "inline",
                      color: isCompleted.includes(idx)
                        ? "green"
                        : isFlagged.includes(idx)
                        ? "red"
                        : isDark
                        ? "wheat"
                        : "#333",
                      maxWidth: "75%",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      wordBreak: "break-word",
                      lineHeight: "23px"
                    }}
                    onClick={(e) => handleComplete(e, idx)}
                    id={idx}
                  >
                    {list}
                  </p>
                </>
              )}
              <div>
                <Button
                  disabled={isCompleted.includes(idx)}
                  isDark={isDark}
                  onClick={handleEdit}
                  idx={idx}
                >
                  {isEditing === idx ? "Save" : "Edit"}
                </Button>
                <Button
                  disabled={isEditing === idx}
                  isDark={isDark}
                  onClick={handleDelete}
                  idx={idx}
                >
                  Delete
                </Button>
              </div>
            </li>
          )
      )}
    </ul>
  );
}

export default List;

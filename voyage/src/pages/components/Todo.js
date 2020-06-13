import React from "react";
import PropTypes from "prop-types";
import "./styles/todo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

const Todo = ({ index, onClick, completed, text }) => (
  <div>
    <FontAwesomeIcon
      className="ellipses-icon"
      icon={faEllipsisH}
    ></FontAwesomeIcon>
    <li
      className="todo"
      onClick={onClick}
      style={{
        textDecoration: completed ? "line-through" : "none",
      }}
    >
      <span className="index">{index}</span>
      {text}
    </li>
  </div>
);

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};

export default Todo;

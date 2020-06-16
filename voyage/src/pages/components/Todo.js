import React, { useState } from "react";
import PropTypes from "prop-types";
import "./styles/todo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Modal from "../Modal";

const customId = "custom-id-yes";

const Todo = ({ index, onClick, completed, text }) => {
  const [showing, setShowing] = useState(false);

  return (
    <div>
      <FontAwesomeIcon
        className="ellipses-icon"
        icon={faEllipsisH}
      ></FontAwesomeIcon>
      <li
        className="todo"
        style={{
          textDecoration: completed ? "line-through" : "none",
        }}
      >
        <span className="index">{index}</span>
        {text}
        <span>
          <button onClick={onClick} className="delete-button">
            <FontAwesomeIcon
              className="trash-icon-color"
              icon={faTrashAlt}
            ></FontAwesomeIcon>
          </button>
        </span>
      </li>
    </div>
  );
};

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};

export default Todo;

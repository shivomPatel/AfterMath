import React from "react";
import PropTypes from "prop-types";
import Todo from "./Todo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl } from "@fortawesome/free-solid-svg-icons";
import "./styles/todolist.css";

const TodoList = ({ todos, removeTodo }) => {
  if (todos.length == 0)
    return (
      <div align="center">
        <h2 className="place-length" align="left">
          Places ( <span className="length">{todos.length}</span> )
        </h2>
        <FontAwesomeIcon
          className="list-icon list-icon-color"
          icon={faListUl}
        ></FontAwesomeIcon>
        <div className="no-places-title" align="center">
          <h3 className="nope-title">No Places yet</h3>
        </div>
      </div>
    );
  let count = 1;
  return (
    <div>
      <h2 className="place-length" align="left">
        Places ( <span className="length">{todos.length}</span> )
      </h2>
      <ul>
        {todos.map((todo) => {
          return (
            <Todo
              index={count++}
              // key={todo.id}
              {...todo}
              onClick={() => removeTodo(todo.id)}
            />
          );
        })}
      </ul>
    </div>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  toggleTodo: PropTypes.func.isRequired,
};

export default TodoList;

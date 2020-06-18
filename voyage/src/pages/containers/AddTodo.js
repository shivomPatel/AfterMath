import React from "react";
import { connect } from "react-redux";
import { addTodo } from "../actions";
import "./styles/addPlace.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const AddTodo = ({ place, dispatch }) => {
  let input;

  if (place !== undefined) {
    return (
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!input.value.trim()) {
              return;
            }
            dispatch(addTodo(input.value));
            input.value = "";
          }}
        >
          <input
            role="search"
            type="text"
            value={place.name}
            id="search-input"
            className="add-input"
            placeholder="Add to Plan"
            ref={(node) => (input = node)}
          />
          <button className="add-button" type="submit">
            <span>
              <FontAwesomeIcon
                className="plus-icon icon-position"
                icon={faPlusCircle}
              ></FontAwesomeIcon>
            </span>
            Add Place
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!input.value.trim()) {
            return;
          }
          dispatch(addTodo(input.value));
          input.value = "";
        }}
      >
        <input
          role="search"
          type="text"
          // value={place.name}
          // onChange={this.handleValueChange}
          id="search-input"
          className="add-input"
          placeholder="Add to Plan"
          ref={(node) => (input = node)}
        />
        <button className="add-button" type="submit">
          <span>
            <FontAwesomeIcon
              className="plus-icon icon-position"
              icon={faPlusCircle}
            ></FontAwesomeIcon>
          </span>
          Add Place
        </button>
      </form>
    </div>
  );
};

export default connect()(AddTodo);

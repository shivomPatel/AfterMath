import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const customId = "custom-id-yes";

const todos = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false,
        },
      ];
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );

    case "REMOVE_TODO":
      let arr = [];
      for (var i = 0; i < state.length; i++) {
        if (state[i].id === action.id) {
          continue;
        } else {
          arr.push(state[i]);
        }
      }
      return arr;
    default:
      return state;
  }
};

export default todos;

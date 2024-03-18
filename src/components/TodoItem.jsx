import { deleteTodo, toggleCompleted } from "../store/todos-slice";
import { useDispatch } from "react-redux";

function TodoItem({ id, text, completed }) {
  const dispatch = useDispatch();
  return (
    <div className="flex justify-between bg-white p-2 m-3 rounded shadow hover:shadow-md transition-all duration-300">
      <div className="flex items-center">
        <input
          className="self-start w-4 h-4 m-3 flex-none"
          id={id}
          type="checkbox"
          checked={completed}
          onChange={() => dispatch(toggleCompleted(id))}
        />
        <label className=" self-start m-2" htmlFor={id}>
          {text}
        </label>
      </div>

      <button
        className="self-start p-1 px-3 m-1 bg-indigo-50 cursor-pointer text-indigo-600 rounded"
        onClick={() => dispatch(deleteTodo(id))}
      >
        Delete
      </button>
    </div>
  );
}

export default TodoItem;

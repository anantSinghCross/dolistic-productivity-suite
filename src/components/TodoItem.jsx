import { useState } from "react";
import { deleteTodo, editTodo, toggleCompleted } from "../store/todos-slice";
import { useDispatch } from "react-redux";

function TodoItem({ id, text, completed, priority, tags, completeBy }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleEdit = () => {
    dispatch(editTodo({ id, text: editText }));
    setIsEditing(false);
    setEditText(editText);
  };

  const note = isEditing ? (
    <textarea
      className=" min-h-12 h-fit w-full p-2 outline-1 outline-indigo-300"
      value={editText}
      onChange={(e) => setEditText(e.target.value)}
    />
  ) : (
    <label className=" self-start m-2 w-full" htmlFor={id}>
      {text}
    </label>
  );

  return (
    <>
      <div class="flex p-4">
        <input
          class="mr-4 mt-4 h-5 w-5 flex-shrink-0 self-start text-indigo-500"
          type="checkbox"
          id={id}
          checked={completed}
          onChange={() => dispatch(toggleCompleted(id))}
        />
        <div class="flex flex-grow items-center rounded-lg border border-gray-200 bg-white p-4">
          <div class="flex-grow">
            <div class="mb-1 flex items-center justify-between">
              <p class="text-xs font-medium text-indigo-500">{`Priority: ${priority}`}</p>
              <p class="text-xs text-gray-400">{`Due: ${completeBy}`}</p>
            </div>
            <p class="mb-4 mt-4 text-sm font-normal text-gray-700">
              {note}
            </p>
            <div class="flex space-x-2">
              <span class="rounded-full bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-500">
                Tag1
              </span>
              <span class="rounded-full bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-500">
                Tag2
              </span>
            </div>
          </div>
        </div>
        <div class="ml-4 flex flex-col gap-2 self-start">
          <button class="rounded bg-indigo-500 px-2 py-1 text-xs font-medium text-white hover:bg-indigo-600"
            onClick={() => {
              if (!isEditing) {
                setIsEditing((prev) => !prev);
              } else {
                handleEdit();
              }
            }}
          >
            {isEditing ? "Save" : "Edit"}
          </button>
          <button class="rounded border border-indigo-500 bg-transparent px-2 py-1 text-xs font-medium text-indigo-500 hover:bg-indigo-100"
            onClick={() => dispatch(deleteTodo(id))}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default TodoItem;

import { useState } from "react";
import { deleteTodo, editTodo, toggleCompleted } from "../store/todos-slice";
import { useDispatch } from "react-redux";
import Tag from "./Tag";

function TodoItem({ id, text, completed, priority, tags, completeBy }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleEdit = () => {
    dispatch(editTodo({ id, text: editText }));
    setIsEditing(false);
    setEditText(editText);
  };

  const dueDate = new Date(completeBy);
  const tagsList = tags.map(tag => <Tag key={tag} name={tag}/>)
  const note = isEditing ? (
    <textarea
      className=" mb-4 mt-4 min-h-12 h-fit w-full text-sm outline-1 outline-indigo-300"
      value={editText}
      onChange={(e) => setEditText(e.target.value)}
    />
  ) : (
    <p className="mb-4 mt-4 text-sm font-normal text-gray-700">
      {text}
    </p>
  );

  return (
    <>
      <div className="flex p-4">
        <input
          className="mr-4 mt-4 h-5 w-5 flex-shrink-0 self-start text-indigo-500"
          type="checkbox"
          id={id}
          checked={completed}
          onChange={() => dispatch(toggleCompleted(id))}
        />
        <div className="flex flex-grow items-center rounded-lg border border-gray-200 bg-white p-4">
          <div className="flex-grow">
            <div className="mb-1 flex items-center justify-between">
              <p className="text-xs font-medium text-indigo-500">{`Priority: ${priority}`}</p>
              <p className="text-xs text-gray-400">{`Due: ${dueDate.toDateString()}`}</p>
            </div>
            {note}
            <div className="flex space-x-2 flex-wrap">
              {tagsList}
            </div>
          </div>
        </div>
        <div className="ml-4 flex flex-col gap-2 self-start">
          <button className="rounded bg-transparent px-2 py-1 text-xs font-medium text-indigo-500 hover:bg-indigo-100"
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
          <button className="rounded bg-transparent px-2 py-1 text-xs font-medium text-indigo-500 hover:bg-indigo-100"
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

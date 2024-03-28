import { useState } from "react";
import { deleteTodo, editTodo, toggleCompleted } from "../../store/todos-slice";
import { useDispatch } from "react-redux";
import { BsCalendar2EventFill } from "react-icons/bs";
import { BiTrash, BiPencil, BiSave } from "react-icons/bi";
import Tag from "./Tag";
import Priority from "./Priority";
import DueDate from "./DueDate";
import { sanitizeTags } from "../../utils";

function TodoItem({
  id,
  text,
  completed,
  priority,
  tags /*array*/,
  completeBy,
}) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);
  const [editPriority, setEditPriority] = useState(priority);
  const [editTags, setEditTags] = useState(tags.join(", "));
  const [editCompleteBy, setEditCompleteBy] = useState(completeBy);

  const handleEdit = () => {
    const tags = sanitizeTags(editTags);
    dispatch(editTodo({ id, text: editText, tags, priority: editPriority, completeBy:editCompleteBy }));
    setIsEditing(false);
  };

  const dateElement = !isEditing ? (
    <DueDate completeBy={completeBy} />
  ) : (
    <input
      className=" p-2 rounded text-sm border"
      type="datetime-local"
      min={new Date().toISOString().slice(0, -8)}
      value={editCompleteBy}
      onChange={(e) => setEditCompleteBy(e.target.value)}
    />
  );

  const priorityElement = !isEditing ? (
    <Priority priority={priority} />
  ) : (
    <select
      defaultValue={editPriority}
      onChange={(e) => setEditPriority(parseInt(e.target.value))}
      className=" p-2 rounded border text-xs"
    >
      <option value="3">High</option>
      <option value="2">Normal</option>
      <option value="1">Low</option>
    </select>
  );

  const tagsList = !isEditing ? (
    tags.map((tag) => <Tag key={tag} name={tag} />)
  ) : (
    <input
      className=" w-full p-1 border rounded text-xs"
      type="text"
      value={editTags}
      onChange={(e) => setEditTags(e.target.value)}
    />
  );

  const note = isEditing ? (
    <textarea
      className=" mb-4 mt-4 min-h-12 h-fit w-full text-sm rounded border"
      value={editText}
      onChange={(e) => setEditText(e.target.value)}
    />
  ) : (
    <p className="mb-4 mt-4 text font-normal text-gray-700">{text}</p>
  );

  return (
    <>
      <div className="flex p-3">
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
              {priorityElement}
              {dateElement}
            </div>
            {note}
            <div className="flex space-x-2 flex-wrap">{tagsList}</div>
          </div>
        </div>
        <div className="ml-4 flex flex-col items-center gap-1 self-start">
          <button
            className="w-max rounded-md p-2 text-indigo-500 hover:bg-indigo-50"
            onClick={() => {
              if (!isEditing) {
                setIsEditing((prev) => !prev);
              } else {
                handleEdit();
              }
            }}
          >
            {isEditing ? (
              <BiSave className="w-5 h-5" />
            ) : (
              <BiPencil className="w-5 h-5" />
            )}
          </button>
          <button
            className="w-max rounded-md p-2 text-indigo-500 hover:bg-indigo-50"
            onClick={() => dispatch(deleteTodo(id))}
          >
            <BiTrash className="w-5 h-5" />
          </button>
        </div>
      </div>
    </>
  );
}

export default TodoItem;

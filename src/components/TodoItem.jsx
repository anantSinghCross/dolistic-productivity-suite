import { useState } from "react";
import { deleteTodo, editTodo, toggleCompleted } from "../store/todos-slice";
import { useDispatch } from "react-redux";
import { BsCalendar2EventFill } from "react-icons/bs";
import { BiTrash, BiPencil, BiSave } from "react-icons/bi";
import Tag from "./Tag";
import Priority from "./Priority";

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
              <Priority priority={priority}/>
              <p className="flex items-center gap-1 text-xs text-gray-400"><BsCalendar2EventFill/>{`${dueDate.toDateString()}`} @ {`${dueDate.getHours()}:${dueDate.getMinutes()/10 < 1? '0'+dueDate.getMinutes():dueDate.getMinutes()}`}</p>
            </div>
            {note}
            <div className="flex space-x-2 flex-wrap">
              {tagsList}
            </div>
          </div>
        </div>
        <div className="ml-4 flex flex-col items-center gap-1 self-start">
          <button className="w-max rounded bg-transparent p-2 text-xs text-indigo-500 hover:bg-indigo-50"
            onClick={() => {
              if (!isEditing) {
                setIsEditing((prev) => !prev);
              } else {
                handleEdit();
              }
            }}
          >
            {isEditing ? <BiSave className="w-5 h-5"/> : <BiPencil className="w-5 h-5"/>}
          </button>
          <button className="w-max rounded bg-transparent p-2 text-indigo-500 hover:bg-indigo-50"
            onClick={() => dispatch(deleteTodo(id))}
          >
            <BiTrash className="w-5 h-5"/>
          </button>
        </div>
      </div>
    </>
  );
}

export default TodoItem;

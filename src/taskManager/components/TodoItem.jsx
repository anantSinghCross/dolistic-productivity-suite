import { useState } from "react";
import { deleteTodo, editTodo, fetchTodosFromDb, toggleCompleted } from "../../store/todos-slice";
import { useDispatch, useSelector } from "react-redux";
import { BsCalendar2EventFill } from "react-icons/bs";
import { BiTrash, BiPencil, BiSave } from "react-icons/bi";
import Tag from "./Tag";
import Priority from "./Priority";
import DueDate from "./DueDate";
import { sanitizeTags } from "../../utils";
import { deleteDoc, doc } from "firebase/firestore";
import { COLLECTION, db } from "../../firebase";
import { CgSpinner } from "react-icons/cg";

function TodoItem({
  id,
  text,
  completed,
  priority,
  tags /*array*/,
  completeBy,
}) {
  const dispatch = useDispatch();
  const uid = useSelector(s => s.auth);
  const [pending, setPending] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);
  const [editPriority, setEditPriority] = useState(priority);
  const [editTags, setEditTags] = useState(tags.join(", "));
  const [editCompleteBy, setEditCompleteBy] = useState(completeBy);

  const handleEdit = () => {
    const tags = sanitizeTags(editTags);
    dispatch(
      editTodo({
        id,
        text: editText,
        tags,
        priority: editPriority,
        completeBy: editCompleteBy,
      }),
    );
    setIsEditing(false);
  };

  const handleDelete = async () => {
    try {
      setPending(true);
      await deleteDoc(doc(db, COLLECTION.TASKS, id));
      dispatch(fetchTodosFromDb(uid))
      setPending(false);
    } catch (error) {
      console.error(error);
    }
    // dispatch(deleteTodo(id));
  };

  const dateElement = !isEditing ? (
    <DueDate completeBy={completeBy} />
  ) : (
    <input
      className="rounded border p-2 text-sm"
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
      className="rounded border p-2 text-xs"
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
      className="w-full rounded border p-1 text-xs"
      type="text"
      value={editTags}
      onChange={(e) => setEditTags(e.target.value)}
    />
  );

  const note = isEditing ? (
    <textarea
      className="mb-4 mt-4 h-fit min-h-12 w-full rounded border text-sm"
      value={editText}
      onChange={(e) => setEditText(e.target.value)}
    />
  ) : (
    <p className="text mb-4 mt-4 font-normal text-gray-700">{text}</p>
  );

  return (
    <>
      <div className="flex px-2 py-1">
        <input
          className="mr-4 mt-4 h-5 w-5 flex-shrink-0 self-start text-indigo-500"
          type="checkbox"
          id={id}
          checked={completed}
          onChange={() => dispatch(toggleCompleted(id))}
        />
        <div className="flex flex-grow items-center rounded-2xl border border-gray-200 bg-white p-4 shadow-lg shadow-gray-100">
          <div className="flex-grow">
            <div className="mb-1 flex flex-col items-center justify-between xs:flex-row">
              {priorityElement}
              {dateElement}
            </div>
            {note}
            <div className="flex flex-wrap space-x-2">{tagsList}</div>
          </div>
        </div>
        <div className="ml-4 flex flex-col items-center gap-1 self-start">
          <button
            className="w-max rounded-md p-2 text-slate-500 hover:bg-slate-100"
            onClick={() => {
              if (!isEditing) {
                setIsEditing((prev) => !prev);
              } else {
                handleEdit();
              }
            }}
          >
            {isEditing ? (
              <BiSave className="h-5 w-5" />
            ) : (
              <BiPencil className="h-5 w-5" />
            )}
          </button>
          <button
            className="w-max rounded-md p-2 text-slate-500 hover:bg-slate-100"
            onClick={handleDelete}
          >{
            pending ? (
              <CgSpinner className=" h-5 w-5 animate-spin"/>
            ) : (
              <BiTrash className="h-5 w-5" />
            )
          }
          </button>
        </div>
      </div>
    </>
  );
}

export default TodoItem;

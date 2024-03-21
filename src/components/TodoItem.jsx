import { useState } from 'react';
import { deleteTodo, editTodo, toggleCompleted } from "../store/todos-slice";
import { useDispatch } from "react-redux";

function TodoItem({ id, text, completed, priority, tags, completeBy }) {
  const dispatch = useDispatch();
  const [ isEditing, setIsEditing ] = useState(false);
  const [ editText, setEditText ] = useState(text);

  const handleEdit = () => {
    dispatch(editTodo({id, text: editText}));
    setIsEditing(false);
    setEditText(editText);
  }

  const note = isEditing? 
    <textarea className=' min-h-12 h-fit w-full p-2 outline-1 outline-indigo-300' value={editText} onChange={(e) => setEditText(e.target.value)} />:
    <label className=" self-start m-2 w-full" htmlFor={id}>
      {text}
    </label>;

  return (
    <div className="flex justify-between bg-white p-2 m-3 rounded shadow hover:shadow-md transition-all duration-300">
      <div className="flex items-center flex-1">
        <input
          className="self-start w-4 h-4 m-3 flex-none"
          id={id}
          type="checkbox"
          checked={completed}
          onChange={() => dispatch(toggleCompleted(id))}
        />
        {note}
      </div>
      <div className="flex self-start flex-nowrap">
        <button
          className="self-start p-1 px-3 m-1 bg-indigo-50 cursor-pointer text-indigo-600 rounded"
          onClick={() => {if(!isEditing){
            setIsEditing(prev => !prev);
          }else{handleEdit()}}}
        >
          {isEditing? 'Save': 'Edit'}
        </button>
        <button
          className="self-start p-1 px-3 m-1 bg-indigo-50 cursor-pointer text-indigo-600 rounded"
          onClick={() => dispatch(deleteTodo(id))}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TodoItem;

import React from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../store/todos-slice";
import { useState } from "react";
import { sanitizeTags } from '../utils'

function AddTodo() {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState(2);
  const [dueDate, setDueDate] = useState((new Date()).toISOString().split('.')[0]);
  const [tagsString, setTagsString] = useState('');
  const dispatch = useDispatch();

  const handleText = (e) => {
    setText(e.target.value)
  }

  const handleDueDate = (e) => {
    setDueDate(e.target.value);
  }

  const handlePriority = (e) => {
    setPriority(e.target.value);
  }

  const handleTags = (e) => {
    setTagsString(e.target.value);
  }

  const handleAddTodo = () => {
    const tags = sanitizeTags(tagsString);
    if (text !== "") {
      dispatch(addTodo({ todo: text, priority:parseInt(priority), tags, completeBy:dueDate }));
    }
    setText('');
    setTagsString('');
    setPriority(2);
  };

  return (
    <>
      <div className="flex items-center bg-indigo-100">
        <div className="flex flex-col flex-grow p-3 rounded">
          <input
            className=" p-2 rounded"
            type="text"
            placeholder="✏️ New Task!"
            value={text}
            onChange={handleText}
          />
          <div className="flex flex-row mt-2 mb-2 gap-2">
            <input
              className=" p-2 pr-3 rounded flex-grow"
              type="datetime-local"
              name=""
              id=""
              value={dueDate}
              onChange={handleDueDate}
            />
            <select defaultValue={priority} onChange={handlePriority} className=" p-2 rounded">
              <option value="3">High</option>
              <option value="2">Normal</option>
              <option value="1">Low</option>
            </select>
          </div>
          <div className="flex flex-grow text-sm">
            <div className="flex items-center rounded-s bg-indigo-500 text-white"><span className="px-2">Tags</span></div>
            <input
              className=" w-full py-1 px-2 rounded-e"
              type="text"
              placeholder="comma separated tags"
              value={tagsString}
              onChange={handleTags}
            />
          </div>
        </div>
        <button
          className="self-start text-white bg-indigo-600 mt-4 mr-4 mb-4 px-3 py-1 border rounded"
          onClick={handleAddTodo}
        >
          Add
        </button>
      </div>
    </>
  );
}

export default AddTodo;

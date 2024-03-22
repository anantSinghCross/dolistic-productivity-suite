import React from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../store/todos-slice";
import { useState } from "react";

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
    const tags = tagsString!==''? tagsString.split(',').map(tag => tag.trim().toLowerCase()) : [];
    if (text !== "") {
      dispatch(addTodo({ todo: text, priority, tags, completeBy:dueDate }));
    }
    setText("");
  };

  return (
    <>
      <div className="flex items-center border bg-indigo-100">
        <div className="flex flex-col flex-grow p-3 rounded border">
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
            <select defaultValue={priority} onChange={handlePriority} className=" p-2 rounded" name="" id="">
              <option value="3">High</option>
              <option value="2">Normal</option>
              <option value="1">Low</option>
            </select>
          </div>
          <input
            className=" p-1 rounded text-sm"
            type="text"
            placeholder="Tags (comma separated)"
            value={tagsString}
            onChange={handleTags}
          />
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

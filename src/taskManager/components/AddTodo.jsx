import React from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../store/todos-slice";
import { useState } from "react";
import { BiSolidPurchaseTag, BiCalendarEvent, BiSolidErrorCircle } from "react-icons/bi";
import { sanitizeTags } from "../../utils";

function AddTodo() {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState(2);
  const [dueDate, setDueDate] = useState(new Date().toISOString().slice(0, -8));
  const [tagsString, setTagsString] = useState("");
  const dispatch = useDispatch();

  const handleText = (e) => {
    setText(e.target.value);
  };

  const handleDueDate = (e) => {
    setDueDate(e.target.value); 
  };

  const handlePriority = (e) => {
    setPriority(e.target.value);
  };

  const handleTags = (e) => {
    setTagsString(e.target.value);
  };

  const handleAddTodo = () => {
    const tags = sanitizeTags(tagsString);
    if (text !== "") {
      dispatch(
        addTodo({
          todo: text,
          priority: parseInt(priority),
          tags,
          completeBy: dueDate,
        })
      );
    }
    setText("");
    setTagsString("");
    setPriority(2);
  };

  return (
    <>
      <div className="flex items-center rounded-lg mr-2 ml-2 bg-slate-200">
        <div className="flex flex-col flex-grow p-3 rounded-md">
          <input
            className=" p-2 rounded-md"
            type="text"
            placeholder="✏️ New Task!"
            value={text}
            min={"2024-04-12T00:00"}
            onChange={handleText}
          />
          <div className="flex flex-row flex-grow mt-2 mb-2 gap-2">
            <div className="flex flex-grow text-sm">
              <div className="flex items-center justify-center p-2 rounded-s-md bg-indigo-500 text-indigo-100 text-lg">
                <BiCalendarEvent />
              </div>
              <input
                className=" p-2 pr-3 rounded-e-md flex-grow"
                type="datetime-local"
                min={new Date().toISOString().slice(0, -8)}
                value={dueDate}
                onChange={handleDueDate}
              />
            </div>

            <div className="flex text-sm">
              <div className="flex items-center justify-center p-2 rounded-s-md bg-indigo-500 text-indigo-100 text-lg">
                <BiSolidErrorCircle />
              </div>
              <select
                defaultValue={priority}
                onChange={handlePriority}
                className=" p-2 rounded-e-md text-sm"
              >
                <option value="3">High</option>
                <option value="2">Normal</option>
                <option value="1">Low</option>
              </select>
            </div>
          </div>
          <div className="flex flex-grow text-sm">
            <div className="flex items-center rounded-s-md bg-indigo-500 text-indigo-100 text-lg">
              <span className="px-2">
                <BiSolidPurchaseTag />
              </span>
            </div>
            <input
              className=" w-full p-2 rounded-e-md"
              type="text"
              placeholder="comma separated tags"
              value={tagsString}
              onChange={handleTags}
            />
          </div>
        </div>
        <button
          className="self-start text-white bg-indigo-600 mt-4 mr-4 mb-4 px-3 py-1 rounded-md"
          onClick={handleAddTodo}
        >
          Add
        </button>
      </div>
    </>
  );
}

export default AddTodo;

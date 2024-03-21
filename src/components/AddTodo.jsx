import React from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../store/todos-slice";
import { useState } from "react";

function AddTodo() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    const priority = 3; // 1, 2, 3
    const tags = ['react', 'redux', 're2act', 'red3ux', 'rea4ct', 're5dux', 're6act', 're7dux', 'rea8ct', 'red8ux', 'resact', 'rsedux', 'rfeact', 'regdux'];  
    const completeBy = Date.now();
    if(text !== ''){
      dispatch(addTodo({todo: text, priority, tags, completeBy}));
    }
    setText("");
  };

  return (
    <div className=" flex justify-between items-baseline bg-indigo-100 p-3">
      <input
        className="flex-auto p-2 rounded outline-indigo-600"
        type="text"
        placeholder="✏️ New Todo!"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="p-1 px-3 mx-3 flex-none bg-indigo-600 cursor-pointer text-white rounded" onClick={handleAddTodo}>
        Add
      </button>
    </div>
  );
}

export default AddTodo;

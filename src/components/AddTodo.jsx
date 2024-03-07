import React from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../store/todos-slice'
import { useState } from 'react';

function AddTodo() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    dispatch(addTodo(text));
    setText('');
  }

  return (
    <div className='card flex-row'>
      <input type="text" placeholder='✏️ New Todo!' value={text} onChange={(e) => setText(e.target.value)} />
      <button className="btn btn-add" onClick={handleAddTodo}>Add</button>
    </div>
  )
}

export default AddTodo
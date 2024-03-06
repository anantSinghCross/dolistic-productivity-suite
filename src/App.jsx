import React, { useEffect } from 'react'
import { fetchTodos } from './store/todos-slice'
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const todos = useSelector(state => state);
  useEffect(() => {
    dispatch(fetchTodos());
  }, [])

  return (
    <div>App</div>
  )
}

export default App
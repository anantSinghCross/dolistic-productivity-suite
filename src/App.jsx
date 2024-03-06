import React, { Fragment, useEffect } from 'react'
import { fetchTodos } from './store/todos-slice'
import { useDispatch, useSelector } from 'react-redux';
import TodoItem from './components/TodoItem';
import Header from './components/Header';

function App() {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  const todoList = todos.map(({ todo, id, completed }) => {
    return <TodoItem key={id} text={todo} completed={completed}/>
  });

  return (
    <Fragment>
      <Header/>
      {todos.length!==0? todoList : <p>Loading... ⏳</p>}
    </Fragment>
  )
}

export default App;
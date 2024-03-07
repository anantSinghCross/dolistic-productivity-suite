import React, { Fragment, useEffect } from 'react'
import { fetchTodos } from './store/todos-slice'
import { useDispatch, useSelector } from 'react-redux';
import TodoItem from './components/TodoItem';
import Header from './components/Header';
import AddTodo from './components/AddTodo';

function App() {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  const todoList = todos.map(({ todo, id, completed }) => {
    return <TodoItem key={id} id={id} text={todo} completed={completed}/>
  });

  return (
    <Fragment>
      <Header/>
      <AddTodo/>
      {todos.length!==0? todoList : <p>Loading... ⏳</p>}
    </Fragment>
  )
}

export default App;
import React, { Fragment, useEffect } from 'react'
import { fetchTodos } from './store/todos-slice'
import { useDispatch, useSelector } from 'react-redux';
import TodoItem from './components/TodoItem';
import Header from './components/Header';
import AddTodo from './components/AddTodo';

function App() {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos.todos);
  const loading = useSelector(state => state.todos.loading);
  
  useEffect(() => {
    const promise = dispatch(fetchTodos());
    return () => {
      promise.abort();
    }
  }, []);

  const todoList = todos.length>0? todos.map(({ todo, id, completed }) => {
    return <TodoItem key={id} id={id} text={todo} completed={completed}/>
  }): <h4 style={{padding: '10px'}}>Start with creating a new task! ✨</h4>;

  return (
    <Fragment>
      <Header/>
      <AddTodo/>
      {!loading? todoList : <h4 style={{padding: '10px'}}>Loading... ⏳</h4>}
    </Fragment>
  )
}

export default App;
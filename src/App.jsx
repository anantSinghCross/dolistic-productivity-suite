import React, { Fragment, useEffect } from "react";
import { fetchTodos } from "./store/todos-slice";
import { useDispatch, useSelector } from "react-redux";
import TodoItem from "./components/TodoItem";
import Header from "./components/Header";
import AddTodo from "./components/AddTodo";

function App() {
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todos.todos);
    const loading = useSelector((state) => state.todos.loading);

  // Todo: 
  // ✅1. Make the priority, tags and due date also editable.
  // ❌2. Make all the fields optional other than main text.
  // ⏸️3. Sorting and filtering options
  // ⏸️4. Add searching functionality
  // 5. Show time remaining in the UI for each Item
  // 6. Reminders for due dates
  // 7. Research toggleable UI for add task form and filter section
  // 8. Browser notifications

    useEffect(() => {
        const promise = dispatch(fetchTodos());
        return () => {
            promise.abort();
        };
    }, []);

    const todoList =
        todos.length > 0 ? (
            todos.map(({ todo, id, completed, priority, tags, completeBy }) => {
                return <TodoItem key={id} id={id} text={todo} completed={completed} priority={priority} tags={tags} completeBy={completeBy} />;
            })
        ) : (
            <h4 className="p-4">Start with creating a new task! ✨</h4>
        );

    return (
        <Fragment>
            <Header />
            <AddTodo />
            {!loading ? todoList : <h4 className="p-4">Loading... ⏳</h4>}
        </Fragment>
    );
}

export default App;

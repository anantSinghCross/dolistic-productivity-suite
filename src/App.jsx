import React, { Fragment, useEffect, useState } from "react";
import { fetchTodos } from "./store/todos-slice";
import { useDispatch, useSelector } from "react-redux";
import TodoItem from "./components/TodoItem";
import Header from "./components/Header";
import AddTodo from "./components/AddTodo";
import Filters from "./components/Filters";
import { filterArray, getUniqueTags, sortSelector } from "./utils";

  // TODO: 
  // ✅1. Make the priority, tags and due date also editable.
  // ✅2. Make tags optional other than main text.
  // ⚒️3. Sorting and filtering options (sort by priority by default, SORT by priority, due date, 
  //    FILTER by tags, priority, completed)
  // 4. Add searching functionality
  // ✅5. Show time remaining in the UI for each Item
  // 6. Reminders for due dates (Browser notifications)
  // 7. Research toggleable UI for add task form and filter section

function App() {
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todos.todos);
    const loading = useSelector((state) => state.todos.loading);
    const [ sorter, setSorter ] = useState(0);
    const [ filters, setFilters ] = useState({
      priority: [],
      completed: [],
      tags: []
    });

    useEffect(() => {
        const promise = dispatch(fetchTodos());
        return () => {
            promise.abort();
        };
    }, []);

    const uniqueTags = getUniqueTags(todos);

    const todoList =
        todos.length > 0 ? (
            filterArray(todos, filters)
            .toSorted(sortSelector(sorter))
            .map(({ todo, id, completed, priority, tags, completeBy }) => {
                return <TodoItem key={id} id={id} text={todo} completed={completed} priority={priority} tags={tags} completeBy={completeBy} />;
            })
        ) : (
            <h4 className="p-4">Start with creating a new task! ✨</h4>
        );

    return (
        <Fragment>
            <Header />
            <AddTodo />
            <Filters uniqueTags={uniqueTags} controls={{filters, setFilters, sorter, setSorter}} />
            {!loading ? todoList : <h4 className="p-4">Loading... ⏳</h4>}
        </Fragment>
    );
}

export default App;

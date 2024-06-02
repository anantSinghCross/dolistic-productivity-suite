import React, { useEffect, useState } from "react";
import { fetchTodos, fetchTodosFromDb } from "../store/todos-slice";
import { useDispatch, useSelector } from "react-redux";
import TodoItem from "./components/TodoItem";
import AddTodo from "./components/AddTodo";
import Filters from "./components/Filters";
import { filterArray, getUniqueTags, sortSelector } from "../utils";
import Accordian from "./components/Accordian";
import SearchBar from "./components/SearchBar";

// TODO: Fetch for tasks added, Now pending Addition, Deletion, Updation

function TaskManager() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const loading = useSelector((state) => state.todos.loading);
  const uid = useSelector((state) => state.auth);
  const [searchText, setSearchText] = useState("");
  const [sorter, setSorter] = useState(0);
  const [filters, setFilters] = useState({
    priority: [],
    completed: [],
    tags: [],
  });

  useEffect(() => {
    // Use condition in thunks to not fetch from firestore again and again
    const promise = dispatch(fetchTodosFromDb(uid));
    return () => {
      promise.abort();
    };
  }, []);

  const uniqueTags = getUniqueTags(todos);

  const todoList =
    todos.length > 0 ? (
      filterArray(todos, filters, searchText)
        .toSorted(sortSelector(sorter))
        .map(({ todo, id, completed, priority, tags, completeBy }) => {
          return (
            <TodoItem
              key={id}
              id={id}
              text={todo}
              completed={completed}
              priority={priority}
              tags={tags}
              completeBy={completeBy}
            />
          );
        })
    ) : (
      <h4 className="p-4 text-center">Start with creating a new task! ✨</h4>
    );

  return (
    <>
      <AddTodo />
      {todos && todos.length > 0 ? (
        <>
          <div className="mx-2">
            <SearchBar controls={{ searchText, setSearchText }} />
          </div>
          <Accordian title={"Filters"}>
            <Filters
              uniqueTags={uniqueTags}
              controls={{ filters, setFilters, sorter, setSorter }}
            />
          </Accordian>
        </>
      ) : null}
      {!loading ? todoList : <h4 className="p-4 text-center">Loading... ⏳</h4>}
    </>
  );
}

export default TaskManager;

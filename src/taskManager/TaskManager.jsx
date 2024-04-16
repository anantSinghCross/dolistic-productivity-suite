import React, { useEffect, useState } from "react";
import { fetchTodos } from "../store/todos-slice";
import { useDispatch, useSelector } from "react-redux";
import TodoItem from "./components/TodoItem";
import Header from "../common/Header";
import AddTodo from "./components/AddTodo";
import Filters from "./components/Filters";
import { filterArray, getUniqueTags, sortSelector } from "../utils";
import Accordian from "./components/Accordian";
import SearchBar from "./components/SearchBar";

function TaskManager() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const loading = useSelector((state) => state.todos.loading);
  const [searchText, setSearchText] = useState("");
  const [sorter, setSorter] = useState(0);
  const [filters, setFilters] = useState({
    priority: [],
    completed: [],
    tags: [],
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
      <h4 className="p-4">Start with creating a new task! ✨</h4>
    );

  return (
    <>
      <AddTodo />
      <div className="mx-2">
        <SearchBar controls={{ searchText, setSearchText }} />
      </div>
      <Accordian title={"Filters"}>
        <Filters uniqueTags={uniqueTags} controls={{ filters, setFilters, sorter, setSorter }} />
      </Accordian>
      {!loading ? todoList : <h4 className="p-4">Loading... ⏳</h4>}
    </>
  );
}

export default TaskManager;

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

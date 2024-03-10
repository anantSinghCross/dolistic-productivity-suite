import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const todosSlice = createSlice({
    name: 'todos',
    initialState : {
        loading: true,
        error: null,
        todos: []
    },
    reducers: {
        addTodo: {
            reducer: (state, action) => {
                state.todos.push(action.payload);
            },
            prepare: (todo) => {
                const todoItem = {todo, id: Math.trunc(Math.random()*100000), completed: false };
                return { payload: todoItem };
            }
        },
        toggleCompleted: (state, action) => {
            const updatedTodos = state.todos.map(todo => {
                if(todo.id == action.payload){
                    return {...todo, completed: !todo.completed}
                }
                return todo;
            });
            return { ...state, todos: updatedTodos };
        },
        deleteTodo: (state, action) => {
            const updatedTodos = state.todos.filter(todo => todo.id != action.payload);
            return {...state, todos: updatedTodos};
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.todos = action.payload.todos;
        })
        builder.addCase(fetchTodos.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(fetchTodos.rejected, (state, action) => {
            return { ...state, loading: false, error: action.payload };
        })
    }
});

const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const todosData = await fetch('https://dummyjson.com/todos');
    return await todosData.json();
})

const { addTodo, deleteTodo, toggleCompleted } = todosSlice.actions;

export { addTodo, toggleCompleted, deleteTodo, fetchTodos };
export default todosSlice;
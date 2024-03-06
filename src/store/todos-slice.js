import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const todosSlice = createSlice({
    name: 'todos',
    initialState : [],
    reducers: {
        addTodo: (state, action) => {
            state.push(action.payload);
        },
        toggleCompleted: (state, action) => {
            return state.map(todo => {
                if(todo.id === action.payload){
                    return {...todo, completed: !todo.completed}
                }
                return todo;
            });
        },
        deleteTodo: (state, action) => {
            return state.filter(todo => todo.id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            return action.payload.todos;
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
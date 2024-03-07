import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const todosSlice = createSlice({
    name: 'todos',
    initialState : [],
    reducers: {
        addTodo: {
            reducer: (state, action) => {
                state.push(action.payload);
            },
            prepare: (todo) => {
                const todoItem = {todo, id: Math.trunc(Math.random()*100000), completed: false };
                return { payload: todoItem };
            }
        },
        toggleCompleted: (state, action) => {
            return state.map(todo => {
                if(todo.id == action.payload){
                    return {...todo, completed: !todo.completed}
                }
                return todo;
            });
        },
        deleteTodo: (state, action) => {
            return state.filter(todo => todo.id != action.payload);
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
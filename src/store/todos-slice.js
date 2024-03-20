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
                state.todos.unshift(action.payload);
            },
            prepare: (todo) => {
                const todoItem = {todo, id: Math.trunc(Math.random()*10000000), completed: false };
                return { payload: todoItem };
            }
        },
        editTodo: (state, action) => {
            const { id, text } = action.payload;
            const updatedTodo = state.todos.find((item) => item.id == id);
            if(updatedTodo){
                updatedTodo.todo = text;
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
            state.todos = action.payload;
        })
        builder.addCase(fetchTodos.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(fetchTodos.rejected, (state, action) => {
            return { ...state, loading: false, error: action.error };
        })
    }
});

const fetchTodos = createAsyncThunk('todos/fetchTodos', async (limit = 5, thunkApi) => {
    try {
        // const todosData = await fetch(`https://dummyjson.com/todos?limit=${limit}`, {signal: thunkApi.signal});
        // return await todosData.json();
        const todosRaw = localStorage.getItem('todos');
        if(todosRaw){
            return JSON.parse(todosRaw);
        } else {
            return [];
        }
    } catch (error) {
        throw error;
        // return thunkApi.rejectWithValue('Error occured')
    }
})

const { addTodo, deleteTodo, toggleCompleted, editTodo } = todosSlice.actions;

export { addTodo, toggleCompleted, deleteTodo, editTodo, fetchTodos };
export default todosSlice;
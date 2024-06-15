import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";
import { COLLECTION, db } from "../firebase";

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    loading: true,
    error: null,
    todos: [],
  },
  reducers: {
    editTodo: (state, action) => {
      const { id, text, tags, priority, completeBy } = action.payload;
      const updatedTodo = state.todos.find((item) => item.id == id);
      if (updatedTodo) {
        updatedTodo.todo = text;
        updatedTodo.tags = tags;
        updatedTodo.priority = priority;
        updatedTodo.completeBy = completeBy;
      }
    },
    toggleCompleted: (state, action) => {
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id == action.payload) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      return { ...state, todos: updatedTodos };
    },
    deleteTodo: (state, action) => {
      const updatedTodos = state.todos.filter((todo) => todo.id != action.payload);
      return { ...state, todos: updatedTodos };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodosFromDb.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.todos = action.payload;
    })
    .addCase(fetchTodosFromDb.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchTodosFromDb.rejected, (state, action) => {
      return { ...state, loading: false, error: action.error };
    });
  },
});

const fetchTodosFromDb = createAsyncThunk("todos/fetchTodosFromDb", async (uid, thunkApi) => {
  try{
    const collectionRef = collection(db, COLLECTION.TASKS);
    const q = query(collectionRef, where('uid', '==', uid));
    const querySnapshot = await getDocs(q);
    const todos = [];
    querySnapshot.forEach(doc => {
      todos.push({
        id: doc.id,
        ...doc.data()
      })
    });
    return todos;
  } catch(error) {
    thunkApi.rejectWithValue(error.message);
    console.error(error.message);
  }
})

const { deleteTodo, toggleCompleted, editTodo } = todosSlice.actions;

export { toggleCompleted, deleteTodo, editTodo, fetchTodosFromDb };
export default todosSlice;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sanitizeTags } from "../utils";

const notesSlice = createSlice({
  name: "notes",
  initialState: [], // id, title, tags, content createdAt, updatedAt
  reducers: {
    addNote: {
      reducer: (state, action) => {
        state.unshift(action.payload);
      },
      prepare: ({ title, tags, content }) => {
        /* title, tagsStr, content*/
        content = structuredClone(content);
        return {
          payload: {
            id: Math.trunc(Math.random() * 10000000),
            title,
            tags,
            content,
            createdAt: new Date().toISOString().slice(0, -8),
            updatedAt: new Date().toISOString().slice(0, -8),
          },
        };
      },
    },
    deleteNote: (state, action) => {
      const id = action.payload;
      return state.filter((note) => note.id !== id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotes.fulfilled, (state, action) => {
      return action.payload;
    })
  }
});

const fetchNotes = createAsyncThunk("notes/fetchNotes", async (_, thunkApi) => {
  const notesString = localStorage.getItem("notes");
  return notesString ? JSON.parse(notesString) : [];
});

export default notesSlice;
const { addNote, deleteNote } = notesSlice.actions;
export { addNote, deleteNote, fetchNotes }
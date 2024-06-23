import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sanitizeTags } from "../utils";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { COLLECTION, db } from "../firebase";

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
    builder.addCase(fetchNotesFromDb.fulfilled, (state, action) => {
      return action.payload;
    })
  }
});

const fetchNotesFromDb = createAsyncThunk("notes/fetchNotesFromDb", async (uid, thunkApi) => {
  const q = query(collection(db, COLLECTION.NOTES), where('uid', '==', uid));
  const querySnapshot = await getDocs(q);
  const notes = [];
  querySnapshot.forEach((doc) => {
    notes.push({
      id: doc.id,
      ...doc.data()
    });
  })
  return notes;
  // return notesString ? JSON.parse(notesString) : [];
});

export default notesSlice;
const { addNote, deleteNote } = notesSlice.actions;
export { addNote, deleteNote, fetchNotesFromDb }
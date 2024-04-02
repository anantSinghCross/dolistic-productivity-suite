import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const draftNoteSlice = createSlice({
  name: "draftNote",
  initialState: {
    title: 'Your new note',
    content: null,
    createdAt: '',
    updatedAt: '',
  }, // raw JSON
  reducers: {
    save: (state, action) => { // whole state needs to be saved
      state.content = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDraftNote.fulfilled, (state, action) => {
      return action.payload;
    })
  }
});

// Saves the whole state as a string in localStorage
const fetchDraftNote = createAsyncThunk("draftNote/fetchDraftNote", async ( _, thunkApi ) => {
  const contentString = localStorage.getItem("editorState");
  const contentRaw = contentString? JSON.parse(contentString) : null;
  return contentRaw;
});

const { save } = draftNoteSlice.actions;

export default draftNoteSlice;
export { save, fetchDraftNote }
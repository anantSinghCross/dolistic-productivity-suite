import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: '',
  tagsStr: '',
  content: null,
  createdAt: '',
  updatedAt: '',
};

const draftNoteSlice = createSlice({
  name: "draftNote",
  initialState: initialState, // raw JSON
  reducers: {
    save: (state, action) => { // whole state needs to be saved
      state.content = action.payload.content;
      state.title = action.payload.title;
      state.tagsStr = action.payload.tagsStr;
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
  const contentRaw = contentString? JSON.parse(contentString) : initialState;
  return contentRaw;
});

const { save } = draftNoteSlice.actions;

export default draftNoteSlice;
export { save, fetchDraftNote }
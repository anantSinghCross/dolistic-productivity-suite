import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { convertFromRaw } from "draft-js";

const draftNoteSlice = createSlice({
  name: "draftNote",
  initialState: null,
  reducers: {
    save: (state, action) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDraftNote.fulfilled, (state, action) => {
      return action.payload;
    })
  }
});

const fetchDraftNote = createAsyncThunk("draftNote/fetchDraftNote", async ( _, thunkApi ) => {
  const contentString = localStorage.getItem("editorState");
  const contentRaw = contentString? JSON.parse(contentString) : null;
  if (contentRaw !== null) {
    return convertFromRaw(contentRaw);
  }
});

const { save } = draftNoteSlice.actions;

export default draftNoteSlice;
export { save, fetchDraftNote }
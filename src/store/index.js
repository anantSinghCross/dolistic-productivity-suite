import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import todosSlice from "./todos-slice";
import { writeDraftToLocalStorage, writeNotesToLocalStorage, writeTodosToLocalStorage } from "./middleware/localStorage";
import draftNoteSlice from "./draftNote-slice";
import notesSlice from "./notes-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    todos: todosSlice.reducer,
    draftNote: draftNoteSlice.reducer,
    notes: notesSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      writeTodosToLocalStorage.middleware,
      writeDraftToLocalStorage.middleware,
      writeNotesToLocalStorage.middleware
    ]),
});

export default store;

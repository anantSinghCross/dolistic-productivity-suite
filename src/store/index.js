import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import todosSlice from "./todos-slice";
import { writeDraftToLocalStorage, writeToLocalStorage } from "./middleware/localStorage";
import draftNoteSlice from "./draftNote-slice";

const store = configureStore({
    reducer:{
        auth: authSlice.reducer,
        todos: todosSlice.reducer,
        draftNote: draftNoteSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([writeToLocalStorage.middleware, writeDraftToLocalStorage.middleware])
});

export default store;
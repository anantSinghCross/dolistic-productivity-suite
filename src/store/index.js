import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import todosSlice from "./todos-slice";
import { writeToLocalStorage } from "./middleware/localStorage";

const store = configureStore({
    reducer:{
        auth: authSlice.reducer,
        todos: todosSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(writeToLocalStorage.middleware)
});

export default store;
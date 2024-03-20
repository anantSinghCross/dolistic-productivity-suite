import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { addTodo, deleteTodo, toggleCompleted, editTodo } from "../todos-slice";

export const writeToLocalStorage = createListenerMiddleware()

// only saving the todos list state not the auth state
writeToLocalStorage.startListening({
    matcher: isAnyOf(addTodo, deleteTodo, toggleCompleted, editTodo),
    effect: async (action, listenerApi) => {
        const todos = listenerApi.getState()?.todos?.todos;
        if(todos) {
            localStorage.setItem('todos', JSON.stringify(todos));
        }
    }
})

// Regular Middleware commented below (would run before the state changes happen)
// export const writeToLocalStorage = store => next => action => {
//     console.log('Action: ', action, '\nState', store.getState());
//     return next(action);
// }

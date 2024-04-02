import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { addTodo, deleteTodo, toggleCompleted, editTodo } from "../todos-slice";
import { save } from "../draftNote-slice";
import { debounced } from "../../utils";

// only saving the todos list state not the auth state
export const writeToLocalStorage = createListenerMiddleware();
writeToLocalStorage.startListening({
    matcher: isAnyOf(addTodo, deleteTodo, toggleCompleted, editTodo),
    effect: async (action, listenerApi) => {
        const todos = listenerApi.getState()?.todos?.todos;
        if (todos) {
            localStorage.setItem("todos", JSON.stringify(todos));
        }
    },
});

// saving draft state to localStorage (by debouncing)
export const writeDraftToLocalStorage = createListenerMiddleware();
writeDraftToLocalStorage.startListening({
    actionCreator: save,
    effect: debounced(async (action, listenerApi) => {
      const draftNoteContentState = listenerApi.getState()?.draftNote;
      if (draftNoteContentState) {
        localStorage.setItem('editorState', JSON.stringify(draftNoteContentState));
      }
      // console.log('Write to localStorage');
    }, 500 ),
});

// Regular Middleware commented below (would run before the state changes happen)
// export const writeToLocalStorage = store => next => action => {
//     console.log('Action: ', action, '\nState', store.getState());
//     return next(action);
// }

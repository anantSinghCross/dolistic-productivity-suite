import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { toggleCompleted, editTodo } from "../todos-slice";
import { save } from "../draftNote-slice";
import { debounced } from "../../utils";
import { addNote} from "../notes-slice";

// only saving the todos list state not the auth state
export const writeTodosToLocalStorage = createListenerMiddleware();
writeTodosToLocalStorage.startListening({
  matcher: isAnyOf(toggleCompleted, editTodo),
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
      localStorage.setItem("editorState", JSON.stringify(draftNoteContentState));
    }
    // console.log('Write to localStorage');
  }, 500),
});

// saving notes list to the localStorage
export const writeNotesToLocalStorage = createListenerMiddleware();
writeNotesToLocalStorage.startListening({
  matcher: isAnyOf(addNote),
  effect: async (action, listenerApi) => {
    const notes = listenerApi.getState()?.notes;
    if (notes) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  },
});

// Regular Middleware commented below (would run before the state changes happen)
// export const writeToLocalStorage = store => next => action => {
//     console.log('Action: ', action, '\nState', store.getState());
//     return next(action);
// }

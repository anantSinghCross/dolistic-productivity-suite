import { Editor, EditorState, RichUtils } from "draft-js";
import React, { useEffect, useState } from "react";
import "draft-js/dist/Draft.css";
import AddNote from "./components/AddNote";
import { useDispatch, useSelector } from "react-redux";
import NoteItem from "./components/NoteItem";
import { deleteNote, fetchNotes } from "../store/notes-slice";

// TODO:
// 1. Implement editing of notes (use Router here)
// 2. Make the AddNote route also separate from the noteList (see behance UI), handle when user is editing or adding a new note
// 3. Add searching, sorting and filtering of notes according to the behance website UI

// 10. Try to use raw JSON as prop and then initialize editorState using props (create a reusable custom editor)

function NotesManager() {
  useEffect(() => {
    dispatch(fetchNotes());
  }, []);

  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes);
  const notesList =
    notes && notes.length > 0
      ? notes.map(({ id, ...otherProps }) => (
          <NoteItem key={id} id={id} {...otherProps} />
        ))
      : null;

  return (
    <>
      <div className=" mr-2 ml-2 p-2 rounded-lg border-2">
        <AddNote />
      </div>
      <div className="grid grid-cols-1 p-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-2">
        {notesList}
      </div>
    </>
  );
}

export default NotesManager;

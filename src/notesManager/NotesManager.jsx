import "draft-js/dist/Draft.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchNotes } from "../store/notes-slice";
import AddNote from "./components/AddNote";
import NoteItem from "./components/NoteItem";

// TODO:
// 1. Implement editing of notes (save draft in localStorage and not in draftState of new note)
// 2. Make the AddNote route also separate from the noteList (see behance UI), handle when user is editing or adding a new note
// 3. Make Tag filtering functional in notes
// 3. Add searching, sorting and filtering of notes according to the behance website UI

function NotesManager() {
  useEffect(() => {
    dispatch(fetchNotes());
  }, []);

  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes);
  const notesList =
    notes && notes.length > 0
      ? notes.map(({ id, ...otherProps }) => <NoteItem key={id} id={id} {...otherProps} />)
      : null;

  return (
    <>
      <div className="flex justify-between m-2 mt-4">
        <div className="flex gap-1 text-xs">
          <button className=" px-4 rounded bg-indigo-600 text-white">All</button>
          <button className="px-3 rounded bg-slate-100">More Tags</button>
        </div>
        <Link to="/notes/add">
          <button className="p-1 px-3 text-slate-600 border rounded-lg hover:bg-slate-100">
            Add Note
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 p-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-2">
        {notesList}
      </div>
    </>
  );
}

export default NotesManager;

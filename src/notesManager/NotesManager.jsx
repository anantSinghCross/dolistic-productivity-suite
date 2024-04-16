import "draft-js/dist/Draft.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchNotes } from "../store/notes-slice";
import NoteItem from "./components/NoteItem";
import { getUniqueTags } from "../utils";
import Tags from "./components/Tags";
import SearchBar from "../taskManager/components/SearchBar";

// TODO:
// ☑️1. Implement editing of notes (handle saving it using Save button only in AddNote)
// 2. Make Tag filtering functional in notes
// 3. Add searching, sorting and filtering of notes according to the behance website UI

function NotesManager() {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes);
  const [tags, setTags] = useState([]);
  const [tagFilter, setTagFilter] = useState([]); // Will have selected filters in an array
  const toggleTagFilter = (tagName) => {
    setTagFilter((p) => {
      let s = new Set(p);
      if (s.has(tagName)) {
        s.delete(tagName);
      } else {
        s.add(tagName);
      }
      return Array.from(s);
    });
  };
  const notesList =
    notes && notes.length > 0
      ? notes
          .filter((note) => {
            return (tagFilter.length===0 || note.tags.some(tag => tagFilter.includes(tag)));
          })
          .map(({ id, ...otherProps }) => <NoteItem key={id} id={id} {...otherProps} />)
      : null;

  useEffect(() => {
    dispatch(fetchNotes());
  }, []);

  useEffect(() => {
    const uniqueTags = notes ? getUniqueTags(notes) : [];
    setTags(uniqueTags);
  }, [notes]);

  return (
    <>
      <div className="flex justify-between m-2 mt-4">
        <div className="flex flex-col w-full gap-2">
          <SearchBar controls={{searchText:'', setSearchText: () => {}}}/>
          <div className="flex justify-between mt-1">
            <Tags tags={tags} tagFilter={tagFilter} toggleTagFilter={toggleTagFilter} />
            <Link to="/notes/add">
              <button className="p-1 px-3 text-slate-600 border rounded-lg hover:bg-slate-100">
                Add Note
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 px-2  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {notesList}
      </div>
    </>
  );
}

export default NotesManager;

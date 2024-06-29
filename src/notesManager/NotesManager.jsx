import "draft-js/dist/Draft.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchNotesFromDb } from "../store/notes-slice";
import NoteItem from "./components/NoteItem";
import { getUniqueTags } from "../utils";
import Tags from "./components/Tags";
import SearchBar from "../taskManager/components/SearchBar";
import { convertFromRaw } from "draft-js";

function NotesManager() {
  const dispatch = useDispatch();
  const uid = useSelector(s => s.auth);
  const notes = useSelector((state) => state.notes);
  const [tags, setTags] = useState([]);
  const [tagFilter, setTagFilter] = useState([]); // Will have selected filters in an array
  const [searchText, setSearchText] = useState("");
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
            return convertFromRaw(note.content).getPlainText().toLowerCase().includes(searchText.toLowerCase());
          })
          .filter((note) => {
            return tagFilter.length === 0 || note.tags.some((tag) => tagFilter.includes(tag));
          })
          .map(({ id, ...otherProps }) => <NoteItem key={id} id={id} {...otherProps} />)
      : null;

  useEffect(() => {
    dispatch(fetchNotesFromDb(uid));
  }, []);

  useEffect(() => {
    const uniqueTags = notes ? getUniqueTags(notes) : [];
    setTags(uniqueTags);
  }, [notes]);

  return (
    <>
      <div className="flex justify-between m-2 mt-4">
        <div className="flex flex-col w-full gap-2">
          <SearchBar controls={{ searchText, setSearchText }} />
          <div className="flex justify-between mt-2">
            <Tags tags={tags} tagFilter={tagFilter} toggleTagFilter={toggleTagFilter} />
            <Link to="/notes/add">
              <button className="primary-grad-btn text-nowrap">
                Add Note
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 px-2  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-2">
        {notesList}
      </div>
    </>
  );
}

export default NotesManager;

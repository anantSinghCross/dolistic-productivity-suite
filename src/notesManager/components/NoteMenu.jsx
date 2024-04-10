import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { deleteNote } from "../../store/notes-slice";
import { useDispatch } from "react-redux";

function NoteMenu({ noteId, title, tags, content, createdAt, updatedAt}) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const toggleShowMenu = () => {
    setShowMenu((p) => !p);
  };

  const menu = showMenu ? (
    <div className="flex flex-col gap-1 absolute p-1 right-0 shadow rounded-md w-max h-max bg-white overflow-clip text-sm text-slate-600">
      <Link to={`/notes/edit`} state={{noteId, title, tags, content, createdAt, updatedAt}}>
        <button className=" w-full rounded hover:bg-slate-100 px-2 py-1">Edit</button>
      </Link>
      <button onClick={() => dispatch(deleteNote(noteId))} className="rounded hover:bg-slate-100 px-2 py-1">Delete</button>
    </div>
  ) : null;

  return (
    <div className=" relative">
      <button className="self-start p-1 px-2 text-xs text-slate-400" onClick={toggleShowMenu}>
        •••
      </button>
      {menu}
    </div>
  );
}

export default NoteMenu;

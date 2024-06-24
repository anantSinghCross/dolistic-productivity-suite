import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { fetchNotesFromDb } from "../../store/notes-slice";
import { useDispatch, useSelector } from "react-redux";
import { deleteDoc, doc } from "firebase/firestore";
import { COLLECTION, db } from "../../firebase";
import { CgSpinner } from "react-icons/cg";

function NoteMenu({ noteId, title, tags, content, createdAt, updatedAt}) {
  const dispatch = useDispatch();
  const uid = useSelector(s => s.auth);
  const [pendingDeletion, setPendingDeletion] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const toggleShowMenu = () => {
    setShowMenu((p) => !p);
  };

  const handleDelete = async () => {
    try {
      setPendingDeletion(true);
      await deleteDoc(doc(db, COLLECTION.NOTES, noteId));
    } catch (error) {
      console.error(error)
    } finally { 
      setPendingDeletion(false);
      dispatch(fetchNotesFromDb(uid))
    }
  }

  const menu = showMenu ? (
    <div className="flex flex-col gap-1 absolute p-2 right-0 shadow rounded-lg w-max h-max bg-white overflow-clip text-sm text-slate-600">
      <Link to={`/notes/edit`} state={{noteId, title, tags, content, createdAt, updatedAt}}>
        <button className=" w-full rounded-md hover:bg-slate-100 px-3 py-2">Edit</button>
      </Link>
      <button disabled={pendingDeletion} onClick={handleDelete} className="rounded-md hover:bg-slate-100 px-3 py-2">
        {
          pendingDeletion ? (
            <span className=" text-gray-400"><CgSpinner className=" animate-spin" size={17}/></span>
          ): (
            'Delete'
          )
        }
      </button>
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

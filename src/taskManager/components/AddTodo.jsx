import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, fetchTodosFromDb } from "../../store/todos-slice";
import { useState } from "react";
import {
  BiSolidPurchaseTag,
  BiCalendarEvent,
  BiSolidErrorCircle,
} from "react-icons/bi";
import { sanitizeTags } from "../../utils";
import Modal from "../../common/Modal";
import { createPortal } from "react-dom";
import { addDoc, collection } from "firebase/firestore";
import { COLLECTION, db } from "../../firebase";
import { CgSpinner } from "react-icons/cg";

function AddTodo() {
  const [text, setText] = useState("");
  const [pending, setPending] = useState(false);
  const [priority, setPriority] = useState(2);
  const [dueDate, setDueDate] = useState(new Date().toISOString().slice(0, -8));
  const [tagsString, setTagsString] = useState("");
  const [showModal, setShowModal] = useState(false);
  const uid = useSelector((s) => s.auth);

  const dispatch = useDispatch();

  const handleText = (e) => {
    setText(e.target.value);
  };

  const handleDueDate = (e) => {
    setDueDate(e.target.value);
  };

  const handlePriority = (e) => {
    setPriority(e.target.value);
  };

  const handleTags = (e) => {
    setTagsString(e.target.value);
  };

  const handleAddTodo = async () => {
    if (text !== "" && uid !== undefined) {
      const tags = sanitizeTags(tagsString);
      const taskCollection = collection(db, COLLECTION.TASKS);
      try {
        setPending(true);
        const docRef = await addDoc(taskCollection, {
          todo: text,
          priority: parseInt(priority),
          tags,
          completeBy: dueDate,
          completed: false,
          uid,
        });
        setPending(false);
        dispatch(fetchTodosFromDb(uid));
        console.log("Success", docRef.id);
        setText("");
        setTagsString("");
        setPriority(2);
        return true;
      } catch (error) {
        console.log("Error Adding doc", error);
        return false;
      }
      // dispatch(
      //   addTodo({
      //     todo: text,
      //     priority: parseInt(priority),
      //     tags,
      //     completeBy: dueDate,
      //     completed: false
      //   }),
      // );
    } else {
      return false;
    }
  };

  return (
    <>
      <div className="flex justify-end p-2">
        <button onClick={() => setShowModal(true)} className="primary-grad-btn">
          Add Task
        </button>
      </div>
      {showModal &&
        createPortal(
          <Modal
            loading={pending}
            loadingText="Adding"
            confirmBtnText="Add"
            onConfirm={async () => {
              const isSaved = await handleAddTodo();
              if (isSaved) {
                setShowModal(false);
              }
            }}
            onCancel={() => setShowModal(false)}
            body={
              <div className="flex w-full flex-col">
                <input
                  className="rounded-md border p-2 shadow-inner"
                  type="text"
                  placeholder="✏️ New Task!"
                  value={text}
                  min={"2024-04-12T00:00"}
                  onChange={handleText}
                />
                <div className="mb-2 mt-2 flex flex-grow flex-col gap-2 xs:flex-row">
                  <div className="flex flex-grow text-sm">
                    <div className="flex items-center justify-center rounded-s-md bg-gradient-to-tr from-slate-300 to-slate-400 p-2 text-lg text-white">
                      <BiCalendarEvent />
                    </div>
                    <input
                      className="flex-grow rounded-e-md border p-2 pr-3 shadow-inner"
                      type="datetime-local"
                      min={new Date().toISOString().slice(0, -8)}
                      value={dueDate}
                      onChange={handleDueDate}
                    />
                  </div>

                  <div className="flex text-sm">
                    <div className="flex items-center justify-center rounded-s-md bg-gradient-to-tr from-slate-300 to-slate-400 p-2 text-lg text-white">
                      <BiSolidErrorCircle />
                    </div>
                    <select
                      defaultValue={priority}
                      onChange={handlePriority}
                      className="w-full rounded-e-md border p-2 text-sm shadow-inner"
                    >
                      <option value="3">High</option>
                      <option value="2">Normal</option>
                      <option value="1">Low</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-grow text-sm">
                  <div className="flex items-center rounded-s-md bg-gradient-to-tr from-slate-300 to-slate-400 text-lg text-white">
                    <span className="px-2">
                      <BiSolidPurchaseTag />
                    </span>
                  </div>
                  <input
                    className="w-full rounded-e-md border p-2 shadow-inner"
                    type="text"
                    placeholder="comma separated tags"
                    value={tagsString}
                    onChange={handleTags}
                  />
                </div>
              </div>
            }
          />,
          document.body,
        )}
    </>
  );
}

export default AddTodo;

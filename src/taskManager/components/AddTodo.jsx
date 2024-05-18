import React from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../store/todos-slice";
import { useState } from "react";
import { BiSolidPurchaseTag, BiCalendarEvent, BiSolidErrorCircle } from "react-icons/bi";
import { sanitizeTags } from "../../utils";
import Modal from "../../common/Modal";
import { createPortal } from "react-dom";

function AddTodo() {
    const [text, setText] = useState("");
    const [priority, setPriority] = useState(2);
    const [dueDate, setDueDate] = useState(new Date().toISOString().slice(0, -8));
    const [tagsString, setTagsString] = useState("");
    const [showModal, setShowModal] = useState(false);

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

    const handleAddTodo = () => {
        const tags = sanitizeTags(tagsString);
        setText("");
        setTagsString("");
        setPriority(2);
        if (text !== "") {
            dispatch(
                addTodo({
                    todo: text,
                    priority: parseInt(priority),
                    tags,
                    completeBy: dueDate,
                })
            );
            return true;
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
                        confirmBtnText="Add"
                        onConfirm={() => {
                            if (handleAddTodo()) {
                                setShowModal(false);
                            }
                        }}
                        onCancel={() => setShowModal(false)}
                        body={
                                <div className="flex flex-col w-full">
                                    <input className=" border p-2 rounded-md shadow-inner" type="text" placeholder="✏️ New Task!" value={text} min={"2024-04-12T00:00"} onChange={handleText} />
                                    <div className="flex flex-col xs:flex-row flex-grow mt-2 mb-2 gap-2">
                                        <div className="flex flex-grow text-sm">
                                            <div className="flex items-center justify-center p-2 rounded-s-md bg-gradient-to-tr from-slate-300 to-slate-400 text-white text-lg">
                                                <BiCalendarEvent />
                                            </div>
                                            <input className=" border p-2 pr-3 rounded-e-md flex-grow shadow-inner" type="datetime-local" min={new Date().toISOString().slice(0, -8)} value={dueDate} onChange={handleDueDate} />
                                        </div>

                                        <div className="flex text-sm">
                                            <div className="flex items-center justify-center p-2 rounded-s-md  bg-gradient-to-tr from-slate-300 to-slate-400  text-white text-lg">
                                                <BiSolidErrorCircle />
                                            </div>
                                            <select defaultValue={priority} onChange={handlePriority} className=" border p-2 rounded-e-md text-sm shadow-inner w-full">
                                                <option value="3">High</option>
                                                <option value="2">Normal</option>
                                                <option value="1">Low</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex flex-grow text-sm">
                                        <div className="flex items-center rounded-s-md  bg-gradient-to-tr from-slate-300 to-slate-400 text-white text-lg">
                                            <span className="px-2">
                                                <BiSolidPurchaseTag />
                                            </span>
                                        </div>
                                        <input className=" border w-full p-2 rounded-e-md shadow-inner" type="text" placeholder="comma separated tags" value={tagsString} onChange={handleTags} />
                                    </div>
                                </div>
                        }
                    />,
                    document.body
                )}
        </>
    );
}

export default AddTodo;

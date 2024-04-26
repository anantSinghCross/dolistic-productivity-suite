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
        if (text !== "") {
            dispatch(
                addTodo({
                    todo: text,
                    priority: parseInt(priority),
                    tags,
                    completeBy: dueDate,
                })
            );
        }
        setText("");
        setTagsString("");
        setPriority(2);
    };

    return (
        <>
            <div className="flex justify-end p-2">
                <button onClick={() => setShowModal(true)} className="p-1 px-3 text-slate-600 border rounded-lg hover:bg-slate-100">
                    Add Task
                </button>
            </div>
            {showModal &&
                createPortal(
                    <Modal
                        setVisible={setShowModal}
                        body={
                            <div class="flex flex-col items-center rounded-lg w-max">
                                <div class="flex flex-col flex-grow p-3 rounded-md">
                                    <input class=" border p-2 rounded-md" type="text" placeholder="✏️ New Task!" value={text} min={"2024-04-12T00:00"} onChange={handleText} />
                                    <div class="flex flex-row flex-grow mt-2 mb-2 gap-2">
                                        <div class="flex flex-grow text-sm">
                                            <div class="flex items-center justify-center p-2 rounded-s-md bg-slate-300 text-white text-lg">
                                                <BiCalendarEvent />
                                            </div>
                                            <input class=" border p-2 pr-3 rounded-e-md flex-grow" type="datetime-local" min={new Date().toISOString().slice(0, -8)} value={dueDate} onChange={handleDueDate} />
                                        </div>

                                        <div class="flex text-sm">
                                            <div class="flex items-center justify-center p-2 rounded-s-md bg-slate-300 text-white text-lg">
                                                <BiSolidErrorCircle />
                                            </div>
                                            <select defaultValue={priority} onChange={handlePriority} class=" border p-2 rounded-e-md text-sm">
                                                <option value="3">High</option>
                                                <option value="2">Normal</option>
                                                <option value="1">Low</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="flex flex-grow text-sm">
                                        <div class="flex items-center rounded-s-md bg-slate-300 text-white text-lg">
                                            <span class="px-2">
                                                <BiSolidPurchaseTag />
                                            </span>
                                        </div>
                                        <input class=" border w-full p-2 rounded-e-md" type="text" placeholder="comma separated tags" value={tagsString} onChange={handleTags} />
                                    </div>
                                    <button class="self-end text-white bg-indigo-500 mt-4 px-3 py-1 rounded-md" onClick={handleAddTodo}>
                                        Add
                                    </button>
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

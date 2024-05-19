import React, { useState } from "react";
import Modal from "../../common/Modal";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { addGoal } from "../../store/goals-slice";
import { nanoid } from "@reduxjs/toolkit";
import ChecklistItem from "./ChecklistItem";

function AddGoal() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [dueDate, setDueDate] = useState(new Date().toISOString().slice(0, -8));
  const [checklist, setChecklist] = useState([]);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTask, setNewTask] = useState('');

  const handleSaveGoal = () => {
    dispatch(addGoal({ 
      title,
      desc, 
      dueDate,
      createdAtDate: new Date().toISOString().slice(0, -8),
      checklist
    }));
    resetFields();
  }

  const addChecklistItem = () => {
    setChecklist(p => {
      const newChecklistItem = {
        id: nanoid(),
        completed: false,
        text: newTask,
      }
      return [...p, newChecklistItem];
    });
    setIsAddingTask(false);
  }

  const resetFields = () => {
    setTitle('');
    setDesc('');
    setChecklist([]);
    setIsAddingTask(false);
    setNewTask('');
  }

  const checklistItems = checklist.map(item => {
    return <ChecklistItem key={item.id} completed={item.completed} text={item.text} />
  })

  return (
    <div className="flex justify-end p-2">
      <button className="primary-grad-btn" onClick={() => setShowModal((p) => !p)}>
        Add Goal
      </button>
      {showModal &&
        createPortal(
          <Modal
            onCancel={() => setShowModal(false)}
            onConfirm={handleSaveGoal}
            confirmBtnText="Save Goal"
            body={
              <div className="flex flex-col rounded-lg w-full items-stretch">
                <div className="flex flex-col flex-grow rounded-md gap-2">
                  <h3 className=" text-gray-500 font-semibold">Title</h3>
                  <input
                    className=" border p-2 rounded-md shadow-inner"
                    type="text"
                    placeholder="✏️ New Goal!"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <h3 className=" text-gray-500 font-semibold">Description</h3>
                  <textarea
                    className="border shadow-inner rounded-md p-2"
                    name="description"
                    rows="3"
                    placeholder="Add a more detailed description..."
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                  ></textarea>
                  <h3 className=" text-gray-500 font-semibold">Due Date</h3>
                  <input
                    className=" border p-2 pr-3 rounded-md flex-grow shadow-inner"
                    type="datetime-local"
                    min={new Date().toISOString().slice(0, -8)}
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                  <h3 className=" text-gray-500 font-semibold">Checklist</h3>
                  <div>
                    {checklistItems}
                  </div>
                  {
                    isAddingTask ? (
                      <div className="flex flex-col gap-2">
                        <textarea
                          className="border shadow-inner rounded-md p-2"
                          name="description"
                          rows="2"
                          placeholder="Add an item"
                          value={newTask}
                          onChange={(e) => setNewTask(e.target.value)}
                        ></textarea>
                        <div className="flex gap-2">
                          <button className="primary-btn" onClick={addChecklistItem}>Add</button>
                          <button className="secondary-btn" onClick={() => setIsAddingTask(false)}>Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <button onClick={() => setIsAddingTask(true)} className="primary-btn w-max">Add an item</button>
                    )
                  }
                </div>
              </div>
            }
          />,
          document.body
        )}
    </div>
  );
}

export default AddGoal;

import React, { useState } from "react";
import { createPortal } from "react-dom";
import { BiCheckSquare } from "react-icons/bi";
import Modal from "../../common/Modal";
import EditGoal from "./EditGoal";
import { useDispatch } from "react-redux";
import { editGoal } from "../../store/goals-slice";

function GoalItem({ goal }) {
  const { title, desc, dueDate, createdAtDate, checklist } = goal;
  const dispatch = useDispatch();
  const [editTitle, setEditTitle] = useState(title);
  const [editDesc, setEditDesc] = useState(desc);
  const [editDueDate, setEditDueDate] = useState(dueDate);
  const [editChecklist, setEditChecklist] = useState(checklist);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleEditGoal = () => {
    dispatch(editGoal({
      id: goal.id,
      title: editTitle,
      desc: editDesc,
      dueDate: editDueDate,
      createdAtDate: goal.createdAtDate,
      checklist: editChecklist,
    }));
    resetFields();
    setShowModal(false);
  }

  const resetFields = () => {
    setEditTitle(editTitle);
    setEditDesc(editDesc);
    setEditChecklist(editChecklist);
    setIsAddingTask(false);
    setNewTask('');
  }

  const checked = checklist.reduce((accum, item) => {
    if (item.checked) {
      accum += 1;
    }
    return accum;
  }, 0);
  const totalItems = checklist.length;
  const progress = Math.ceil((checked / totalItems) * 100);

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className="flex flex-col p-4 m-2 border rounded-2xl shadow-lg shadow-gray-100 border-gray-200 cursor-pointer"
      >
        {/* Progress Bar */}
        <div className=" mb-2 flex items-center w-full gap-2">
          <div className="rounded-md h-3 w-full shadow-inner bg-gray-50">
            <div
              className={`rounded-full h-3 w-[${progress}%] bg-gradient-to-t from-green-300 to-teal-400 shadow-md shadow-teal-100`}
            ></div>
          </div>
          <span className="w-max font-bold text-transparent bg-gradient-to-t from-green-300 to-teal-400 bg-clip-text">
            {`${progress}%`}
          </span>
        </div>
        <p>{title}</p>
        <span className="flex text-gray-400 items-center">
          <BiCheckSquare size={20} /> {`${checked}/${totalItems}`}
        </span>
      </div>
      {showModal &&
        createPortal(
          <Modal
            onCancel={() => setShowModal(false)}
            onConfirm={handleEditGoal}
            confirmBtnText="Save Goal"
            body={
              <EditGoal
                desc={editDesc}
                setDesc={setEditDesc}
                title={editTitle}
                setTitle={setEditTitle}
                dueDate={editDueDate}
                setDueDate={setEditDueDate}
                newTask={newTask}
                setNewTask={setNewTask}
                isAddingTask={isAddingTask}
                setIsAddingTask={setIsAddingTask}
                checklist={editChecklist}
                setChecklist={setEditChecklist}
              />
            }
          />,
          document.body
        )}
    </>
  );
}

export default GoalItem;

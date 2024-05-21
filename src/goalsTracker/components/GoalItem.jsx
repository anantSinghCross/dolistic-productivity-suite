import React, { useState } from "react";
import { createPortal } from "react-dom";
import { BiCheckSquare } from "react-icons/bi";
import Modal from "../../common/Modal";
import EditGoal from "./EditGoal";
import { useDispatch } from "react-redux";
import { editGoal } from "../../store/goals-slice";
import ProgressBar from "./ProgressBar";
import { calculateProgress } from "../../utils";

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
    dispatch(
      editGoal({
        id: goal.id,
        title: editTitle,
        desc: editDesc,
        dueDate: editDueDate,
        createdAtDate: goal.createdAtDate,
        checklist: editChecklist,
      })
    );
    resetFields();
    setShowModal(false);
  };

  const resetFields = () => {
    setEditTitle(editTitle);
    setEditDesc(editDesc);
    setEditChecklist(editChecklist);
    setIsAddingTask(false);
    setNewTask("");
  };

  const {checkedItems:checked, totalItems, progress} = calculateProgress(checklist);

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className="flex flex-col p-4 m-2 border rounded-2xl shadow-lg shadow-gray-100 border-gray-200 cursor-pointer"
      >
        <ProgressBar progress={progress} />
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
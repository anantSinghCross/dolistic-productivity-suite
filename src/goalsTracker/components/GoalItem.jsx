import React, { useState } from "react";
import { createPortal } from "react-dom";
import { BiCheckSquare } from "react-icons/bi";
import Modal from "../../common/Modal";
import EditGoal from "./EditGoal";
import { useDispatch, useSelector } from "react-redux";
import { editGoal, fetchGoals } from "../../store/goals-slice";
import ProgressBar from "./ProgressBar";
import { calculateProgress } from "../../utils";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { COLLECTION, db } from "../../firebase";
import { BiTrash } from 'react-icons/bi'
import { CgSpinner } from "react-icons/cg";


function GoalItem({ goal }) {
  const { title, desc, dueDate, createdAtDate, checklist } = goal;
  const uid = useSelector(s => s.auth);
  const dispatch = useDispatch();
  const [pendingEdit, setPendingEdit] = useState(false);
  const [pendingDeletion, setPendingDeletion] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDesc, setEditDesc] = useState(desc);
  const [editDueDate, setEditDueDate] = useState(dueDate);
  const [editChecklist, setEditChecklist] = useState(checklist);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleEditGoal = async () => {
    try {
      setPendingEdit(true);
      await setDoc(doc(db, COLLECTION.GOALS, goal.id), {
        title: editTitle,
        desc: editDesc,
        dueDate: editDueDate,
        createdAtDate: goal.createdAtDate,
        checklist: editChecklist,
      }, {merge: true});
    } catch (error) {
      console.error(error);
    } finally {
      setPendingEdit(false);
      resetFields();
      setShowModal(false);
      dispatch(fetchGoals(uid));
    } 
  };

  const handleDeletion = async (e) => {
    e.stopPropagation()
    try {
      setPendingDeletion(true);
      await deleteDoc(doc(db, COLLECTION.GOALS, goal.id));
    } catch (error) {
      console.error(error)
    } finally {
      setPendingDeletion(false)
      dispatch(fetchGoals(uid));
    }
  }

  const resetFields = () => {
    setEditTitle(editTitle);
    setEditDesc(editDesc);
    setEditChecklist(editChecklist);
    setIsAddingTask(false);
    setNewTask("");
  };

  const { checkedItems, totalItems, progress } = calculateProgress(checklist);

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className="group flex flex-col p-4 m-2 border rounded-2xl shadow-lg shadow-gray-100 border-gray-200 cursor-pointer"
      >
        <ProgressBar progress={progress} />
        <p className=" font-semibold my-2 text-gray-600">{title}</p>
        <div className="flex justify-between">
          <span className="flex gap-1 text-sm font-semibold text-gray-400 items-center rounded-md bg-gradient-to-t from-slate-100 p-1 px-2 w-max">
            <BiCheckSquare size={18} /> {`${checkedItems}/${totalItems}`}
          </span>
          <button 
            className='group-hover:visible invisible p-2 text-gray-400 bg-white border rounded shadow'
            onClick={handleDeletion}
          >
            {
              pendingDeletion ? (
                <CgSpinner className=" animate-spin" size={17}/>
              ) : (
                <BiTrash/>
              )
            }
          </button>
        </div>
      </div>
      {showModal &&
        createPortal(
          <Modal
            loading={pendingEdit}
            loadingText="Saving"
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

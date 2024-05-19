import React, { useState } from "react";
import Modal from "../../common/Modal";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { addGoal } from "../../store/goals-slice";
import EditGoal from "./EditGoal";

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
    setShowModal(false);
  }

  const resetFields = () => {
    setTitle('');
    setDesc('');
    setChecklist([]);
    setIsAddingTask(false);
    setNewTask('');
  }

  return (
    <div className="flex justify-end p-2 mb-2">
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
              <EditGoal
                desc={desc}
                setDesc={setDesc}
                title={title}
                setTitle={setTitle}
                dueDate={dueDate}
                setDueDate={setDueDate}
                newTask={newTask}
                setNewTask={setNewTask}
                isAddingTask={isAddingTask}
                setIsAddingTask={setIsAddingTask}
                checklist={checklist}
                setChecklist={setChecklist}
              />
            }
          />,
          document.body
        )}
    </div>
  );
}

export default AddGoal;    
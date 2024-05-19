import { nanoid } from "@reduxjs/toolkit";
import ChecklistItem from "./ChecklistItem";

// TODO: Make the checkboxes toggleable

export default function EditGoal({
  checklist,
  setChecklist,
  desc,
  dueDate,
  isAddingTask,
  newTask,
  setDesc,
  setDueDate,
  setIsAddingTask,
  setNewTask,
  setTitle,
  title,
}) {
  
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

  const handleDelete = (id) => {
    setChecklist(p => {
      return p.filter(item => item.id != id);
    });
  }
  
  const checklistItems = checklist.map((item) => {
    return (
      <ChecklistItem
        key={item.id}
        completed={item.completed}
        text={item.text}
        handleDelete={() => handleDelete(item.id)}
      />
    );
  });

  return (
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
        <div>{checklistItems}</div>
        {isAddingTask ? (
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
              <button className="primary-btn" onClick={addChecklistItem}>
                Add
              </button>
              <button className="secondary-btn" onClick={() => setIsAddingTask(false)}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button onClick={() => setIsAddingTask(true)} className="primary-btn w-max">
            Add an item
          </button>
        )}
      </div>
    </div>
  );
}

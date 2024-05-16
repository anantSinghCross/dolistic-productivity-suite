import React, { useState } from "react";
import Modal from "../../common/Modal";
import { createPortal } from "react-dom";

function AddGoal() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="flex justify-end p-2">
      <button className="primary-grad-btn" onClick={() => setShowModal((p) => !p)}>
        Add Goal
      </button>
      {showModal &&
        createPortal(
          <Modal
          onCancel={() => setShowModal(false)}
            body={
              <div className="flex flex-col rounded-lg max-w-2xl w-[90vw] items-stretch">
                <div className=" mb-2 flex items-center w-full gap-2">
                  <div className="rounded-md h-5 w-full shadow-inner bg-gray-50">
                    <div className="rounded-md h-5 w-[80%] bg-gradient-to-t from-green-300 to-teal-400 shadow-md shadow-teal-100"></div>
                  </div>
                  <span className="w-max text-lg font-bold text-transparent bg-gradient-to-t from-green-300 to-teal-400 bg-clip-text">
                    80%
                  </span>
                </div>
                <div className="flex flex-col flex-grow rounded-md gap-2">
                  <input
                    className=" border p-2 rounded-md shadow-inner"
                    type="text"
                    placeholder="✏️ New Goal!"
                    min={"2024-04-12T00:00"}
                  />
                  <h3 className=" text-gray-500 font-semibold">Description</h3>
                  <textarea
                    className="border shadow-inner rounded-md p-2"
                    name="description"
                    id=""
                    cols="30"
                    rows="5"
                    placeholder="Add a more detailed description..."
                  ></textarea>
                  <h3 className=" text-gray-500 font-semibold">Due Date</h3>
                  <input
                    className=" border p-2 pr-3 rounded-md flex-grow shadow-inner"
                    type="datetime-local"
                    min={new Date().toISOString().slice(0, -8)}
                  />
                  <h3 className=" text-gray-500 font-semibold">Checklist</h3>
                  <button className="primary-btn w-max">Add an item</button>
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

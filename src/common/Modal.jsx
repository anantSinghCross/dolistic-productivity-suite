import React, { useState } from "react";
import { CgSpinner } from "react-icons/cg";

function Modal({
  body = <p>Modal</p>,
  showControls = true,
  onCancel = () => {},
  onConfirm = () => {},
  confirmBtnText = "Confirm",
  loading=false,
  loadingText = "Pending",
}) {
  const outsideTouchHandler = (e) => {
    if (e.target.id === e.currentTarget.id) {
      onCancel();
    }
  };
  return (
    <div
      onClick={outsideTouchHandler}
      id="modal"
      className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur backdrop-brightness-90"
    >
      <div className="m-4 flex w-screen max-w-2xl flex-col gap-4 rounded-2xl bg-white p-4 shadow-xl">
        <div className="flex items-center gap-4">{body}</div>
        <div className="flex justify-end gap-2">
          <button disabled={loading} onClick={onCancel} className="secondary-btn">
            Cancel
          </button>
          {
            loading ? (
              <button disabled onClick={onConfirm} className="primary-grad-btn">
                <span className="flex gap-2 items-center"><CgSpinner className="animate-spin" size={17}/>{loadingText}</span>
              </button>
            ) : (
              <button onClick={onConfirm} className="primary-grad-btn">
                {confirmBtnText}
              </button>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default Modal;

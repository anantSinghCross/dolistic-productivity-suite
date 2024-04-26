import React from 'react'
import { createPortal } from 'react-dom'
import { BiX } from 'react-icons/bi'

function Modal({ body=<p>Modal</p>, showControls = true, setVisible, onConfirm = ()=>{} }) {
    const onClose = () => setVisible(false);
    const onCancel = () => setVisible(false);
    return (
    <div className="fixed top-0 left-0 flex w-screen h-screen items-center justify-center backdrop-blur backdrop-brightness-90">
        <div className="flex w-max max-w-xl flex-col gap-4 rounded-xl bg-white p-4 shadow-md">
            <div className="flex items-center gap-4">
                {body}
                {showControls && <button onClick={onClose} className="rounded-md px-3 py-1 self-start"><BiX/></button>}
            </div>
            {showControls && (
                <div className="flex justify-end gap-2">
                    <button onClick={onCancel} className="rounded-md px-3 py-1 border hover:bg-slate-100">Cancel</button>
                    <button onClick={onConfirm} className="rounded-md px-3 py-1 bg-indigo-500 text-white active:bg-indigo-600">Confirm</button>
                </div>
            )}
        </div>
    </div>
  )
}

export default Modal
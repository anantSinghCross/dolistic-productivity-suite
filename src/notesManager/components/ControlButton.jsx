import React from "react";

function ControlButton({ onClick, name, className = '' }) {
  return (
    <button className={`p-1 border-2 border-slate-200 rounded hover:bg-slate-200 ${className}`} onClick={onClick}>{name}</button>
  )
}

export default ControlButton;

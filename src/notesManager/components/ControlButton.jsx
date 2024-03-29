import React from "react";

function ControlButton({ onClick, name }) {
  return (
    <button className=" p-1 border-2 border-slate-200 rounded hover:bg-slate-200" onClick={onClick}>{name}</button>
  )
}

export default ControlButton;

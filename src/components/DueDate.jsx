import React from "react";
import { BiSolidTimeFive, BiSolidCalendarEvent } from "react-icons/bi";

function DueDate({ completeBy }) {
  const dueDate = new Date(completeBy);
  const firstDate = new Date(0);
  const requiredDate = new Date(dueDate.getTime() - Date.now());
  const yearsDiff = requiredDate.getFullYear() - firstDate.getFullYear();
  const monthsDiff = requiredDate.getMonth() - firstDate.getMonth();
  const daysDiff = requiredDate.getDate() - firstDate.getDate();
  const hoursDiff = requiredDate.getHours() - firstDate.getHours();
  const minutesDiff = requiredDate.getMinutes() - firstDate.getMinutes();

  const diffElement = (
    <span className="flex items-center gap-1 rounded-full bg-slate-100 px-1 text-slate-600">
        <BiSolidTimeFive/>
      {`${yearsDiff > 0 ? yearsDiff + "Y" : ""} ${
        monthsDiff > 0 ? monthsDiff + "M" : ""
      } ${daysDiff > 0 ? daysDiff + "d" : ""} ${
        hoursDiff > 0 ? hoursDiff + "h" : ""
      } ${minutesDiff > 0 ? minutesDiff + "m" : ""}`}
    </span>
  );

  return (
    <div className="flex items-center gap-1 text-xs text-gray-500">
      <p className="flex items-center gap-1">
        <BiSolidCalendarEvent />
        {`${dueDate.toDateString()}`},
        {` ${dueDate.getHours()}:${
          dueDate.getMinutes() / 10 < 1
            ? "0" + dueDate.getMinutes()
            : dueDate.getMinutes()
        }`}
      </p>
      {diffElement}
    </div>
  );
}

export default DueDate;

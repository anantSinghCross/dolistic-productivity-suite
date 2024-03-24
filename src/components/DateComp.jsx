import React from "react";
import { BsCalendar2EventFill } from "react-icons/bs";

function DateComp({ completeBy }) {

    const dueDate = new Date(completeBy);

    return (
        <p className="flex items-center gap-1 text-xs text-gray-400">
            <BsCalendar2EventFill />
            {`${dueDate.toDateString()}`} @
            {` ${dueDate.getHours()}:${dueDate.getMinutes() / 10 < 1
                    ? "0" + dueDate.getMinutes()
                    : dueDate.getMinutes()
                }`}
        </p>
    );
}

export default DateComp;

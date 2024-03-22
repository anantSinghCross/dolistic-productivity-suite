import React from "react";
import { BsChevronUp, BsChevronDoubleUp, BsChevronDoubleDown } from "react-icons/bs";

function Priority({ priority }) {

    let element = null;
    if(priority === 3) {
        element = <BsChevronDoubleUp/>
    } else if (priority === 2) {
        element = <BsChevronUp/>
    } else if (priority === 1) {
        element = <BsChevronDoubleDown/>
    }

    let tailwindColorClass = '';
    if(priority === 3) {
        tailwindColorClass = 'text-red-500'
    } else if (priority === 2) {
        tailwindColorClass = 'text-blue-500'
    } else if (priority === 1) {
        tailwindColorClass = 'text-slate-300'
    }

    return (
        <p className={"text-lg " + tailwindColorClass}>{element}</p>
    );
}

export default Priority;

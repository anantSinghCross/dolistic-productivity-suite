import React from "react";
import { BiChevronsUp, BiChevronUp, BiChevronsDown } from "react-icons/bi";

function Priority({ priority }) {

    let element = null;
    if(priority === 3) {
        element = <BiChevronsUp/>
    } else if (priority === 2) {
        element = <BiChevronUp/>
    } else if (priority === 1) {
        element = <BiChevronsDown/>
    }

    let tailwindColorClass = '';
    if(priority === 3) {
        tailwindColorClass = 'bg-red-50 text-red-500'
    } else if (priority === 2) {
        tailwindColorClass = 'bg-blue-50 text-blue-500'
    } else if (priority === 1) {
        tailwindColorClass = 'bg-slate-50 text-slate-300'
    }

    return (
        <p className={"text-xl rounded-full " + tailwindColorClass}>{element}</p>
    );
}

export default Priority;

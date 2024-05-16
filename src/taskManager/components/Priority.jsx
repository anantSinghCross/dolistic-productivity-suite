import React from "react";
import { BiChevronsUp, BiChevronUp, BiChevronsDown } from "react-icons/bi";

function Priority({ priority }) {

    let element = null;
    if(priority === 3) {
        element = <span className="flex items-center"><BiChevronsUp/> <span className=" text-[0.65rem] font-medium">HIGH</span></span>
    } else if (priority === 2) {
        element = <span className="flex items-center"><BiChevronUp/> <span className=" text-[0.65rem] font-medium">MED</span></span>
    } else if (priority === 1) {
        element = <span className="flex items-center"><BiChevronsDown/> <span className=" text-[0.65rem] font-medium">LOW</span></span>
    }

    let tailwindColorClass = '';
    if(priority === 3) {
        tailwindColorClass = 'bg-red-50 text-red-500'
    } else if (priority === 2) {
        tailwindColorClass = 'bg-blue-50 text-blue-500'
    } else if (priority === 1) {
        tailwindColorClass = 'bg-slate-100 text-slate-400'
    }

    return (
        <p className={"text-sm rounded-md px-2 " + tailwindColorClass}>{element} </p>
    );
}

export default Priority;

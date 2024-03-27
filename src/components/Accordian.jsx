import React, { useRef, useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

// A generalised Accordian

function Accordian({ children, title }) {
  const contentRef = useRef(null);
  const [show, setShow] = useState(false);

  const handleClick = (e) => {
    setShow((s) => !s);
    if (contentRef.current.style.maxHeight) {
      contentRef.current.style.maxHeight = null;
    } else {
      contentRef.current.style.maxHeight = contentRef.current.scrollHeight + "px";
    }
  };

  return (
    <div className=" m-2 border-2 rounded-lg">
      <div
        onClick={handleClick}
        className="flex justify-between border-b items-center p-2 px-3 text-md"
      >
        <p className="font-medium">{title}</p>
        {!show ? <BiChevronDown /> : <BiChevronUp />}
      </div>
      <div ref={contentRef} className="max-h-0 transition-all overflow-hidden">
        {children}
      </div>
    </div>
  );
}

export default Accordian;

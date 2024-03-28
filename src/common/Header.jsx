import React from "react";
import { NavLink } from "react-router-dom";

const activeClass = ({isActive}) => {
  if(isActive) {
    return "px-3 py-2 border-b-4 border-indigo-600"
  } else {
    return "px-3 py-2 border-b-transparent border-b-4 hover:border-b-4 hover:border-solid hover:border-indigo-300"
  }
}

function Header() {
  return (
    <nav className="flex justify-between items-center p-4 bg-white">
      <h1 className="text-lg font-medium">DoListic 📝</h1>
      <menu className="flex gap-2">
        <NavLink
          to="/"
          className={activeClass}
        >
          Tasks
        </NavLink>
        <NavLink
          to="/notes"
          className={activeClass}
        >
          Notes
        </NavLink>
      </menu>
    </nav>
  );
}

export default Header;

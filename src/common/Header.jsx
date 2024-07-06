import { signOut } from "firebase/auth";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const activeClass = ({isActive}) => {
  if(isActive) {
    return "px-3 py-2 border-b-4 border-indigo-600"
  } else {
    return "px-3 py-2 border-b-transparent border-b-4 hover:border-b-4 hover:border-solid hover:border-indigo-300"
  }
}

const handleLogout = () => {
  signOut(auth)
}

function Header() {
  const uid = useSelector(state => state.auth);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col">
      <nav className="flex justify-between items-baseline p-4 bg-gradient-to-b from-indigo-200 via-blue-100">
        <h1 className="text-lg font-medium">DoListic 📝</h1>
        <menu className="sm:flex gap-2 hidden">
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
          <NavLink
            to="/goals"
            className={activeClass}
          >
            Goals
          </NavLink>
        </menu>
        {
          uid ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <button onClick={() => navigate('/login')}>Login</button>
          )
        }
      </nav>
      <menu className="flex gap-2 pt-1 sm:hidden justify-center items-center rounded-lg bg-gray-100 mx-4 text-sm">
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
        <NavLink
          to="/goals"
          className={activeClass}
        >
          Goals
        </NavLink>
      </menu>
    </div>
  );
}

export default Header;

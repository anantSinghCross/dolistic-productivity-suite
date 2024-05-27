import React, { useEffect } from "react";
import TaskManager from "./taskManager/TaskManager";
import { Routes, Route } from "react-router-dom";
import Header from "./common/Header";
import NotesManager from "./notesManager/NotesManager";
import AddNote from "./notesManager/components/AddNote";
import GoalsTracker from "./goalsTracker/GoalsTracker";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { removeAuthDetails, setUserDetails } from "./store/auth-slice";
import ProtectedRoutes from "./layouts/ProtectedRoutes";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user) {
        console.log('User logged in');
        dispatch(setUserDetails(user.uid));
      } else {
        console.log('User logged out');
        dispatch(removeAuthDetails());
      }
    })
  }, [])
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ProtectedRoutes />}>
          <Route index element={<TaskManager />} />
          <Route path="/notes" element={<NotesManager />} />
          <Route path="/notes/edit" element={<AddNote />} />
          <Route path="/notes/add" element={<AddNote />} />
          <Route path="/goals" element={<GoalsTracker />} />
          <Route path="*" element={<div className="text-lg m-3">Couldn't Find What You're Looking For! 😓</div>} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;

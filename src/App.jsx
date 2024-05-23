import React from "react";
import TaskManager from "./taskManager/TaskManager";
import { Routes, Route } from "react-router-dom";
import Header from "./common/Header";
import NotesManager from "./notesManager/NotesManager";
import AddNote from "./notesManager/components/AddNote";
import GoalsTracker from "./goalsTracker/GoalsTracker";
import Signup from "./auth/Signup";
import Login from "./auth/Login";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<TaskManager />} />
        <Route path="/notes" element={<NotesManager />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/notes/edit" element={<AddNote />} />
        <Route path="/notes/add" element={<AddNote />} />
        <Route path="/goals" element={<GoalsTracker />} />
        <Route path="*" element={<div className="text-lg m-3">Couldn't Find What You're Looking For! 😓</div>} />
      </Routes>
    </>
  );
}

export default App;

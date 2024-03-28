import React from "react";
import TaskManager from "./taskManager/TaskManager";
import { Routes, Route } from "react-router-dom";
import Header from "./common/Header";
import NotesManager from "./notesManager/NotesManager";

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route index path="/" element={<TaskManager/>} />
        <Route path="/notes-manager" element={<NotesManager/>} />
      </Routes>
    </>
  );
}

export default App;

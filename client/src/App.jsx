import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/general/navbar";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";
import About from "./components/pages/About";
import Home from "./components/pages/Home";
import Forgetpass from "./components/pages/ForgetPass";
import Profile from "./components/pages/Profile";
import TaskDetail from "./components/general/taskDetail";

export default function App() {
  const jwtToken = localStorage.getItem("token");
  const [taskId, setTaskId] = useState("");
  return (
    <>
      <NavBar jwtToken={jwtToken} />
      <Router>
        <Routes>
          <Route exact path="/forpass" element={<Forgetpass />} />
          <Route
            exact
            path="/"
            element={<Home jwtToken={jwtToken} setTaskId={setTaskId} />}
          />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route
            exact
            path="/profile"
            element={<Profile jwtToken={jwtToken} />}
          />
          <Route exact path="/task" element={<TaskDetail taskId={taskId} />} />
          <Route
            exact
            path="/taskdetail"
            element={<TaskDetail jwtToken={jwtToken} taskId={taskId} />}
          />
        </Routes>
      </Router>
    </>
  );
}

import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { faCheck, faSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TaskDetail({ jwtToken }) {
  const [task, setTask] = useState({ title: "", description: "", done: false });
  const taskId = localStorage.getItem("TaskId");
  useEffect(() => {
    axios
      .get(`http://localhost:8080/get/${taskId}`)
      .then((res) => {
        setTask({
          title: res.data.task.title,
          description: res.data.task.description,
          done: res.data.task.done,
        });
      })
      .catch((err) => {});
  });
  function handleBackClick() {
    window.location.href = "/";
  }
  return (
    <div div className="task-details-page">
      <h1>Title : {task.title}</h1>
      <p> Description : {task.description}</p>
      <p>
        {" "}
        Done :{" "}
        {task.done ? (
          <FontAwesomeIcon icon={faCheck} size="1x" />
        ) : (
          <FontAwesomeIcon
            icon={faSquare}
            size="1x"
            style={{ color: "#ffffff" }}
          />
        )}
      </p>
      <button className="back-button" onClick={handleBackClick}>
        <b>Back</b>
      </button>
    </div>
  );
}

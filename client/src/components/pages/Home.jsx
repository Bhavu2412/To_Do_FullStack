import Form from "../general/searchForm";
import Card from "../general/Cards";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Home({ jwtToken, setTaskId }) {
  const [Tasks, setTasks] = useState([]);
  useEffect(() => {
    if (jwtToken) {
      axios
        .get("http://localhost:8080/home", {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        })
        .then((res) => {
          setTasks(res.data.tasks);
        })
        .catch((err) => {});
    }
  }, [Tasks, jwtToken]);

  return (
    <div className="home-task">
      <Form jwtToken={jwtToken} />

      {/* {Tasks.map((task) => {
        return Tasks.length === -1 ? (
          <p>No task found</p>
        ) : (
          <Card
            setTaskId={setTaskId}
            title={task.title}
            jwtToken={jwtToken}
            done={task.done}
            id={task._id}
          />
        );
      })} */}
      <div className="tasks">
        {Tasks.length === 0 ? (
          <img src="not_found.jpg" alt="not found" height="300px" />
        ) : (
          Tasks.map((task) => (
            <Card
              key={task._id} // Add a unique key prop when rendering a list of components
              setTaskId={setTaskId}
              title={task.title}
              jwtToken={jwtToken}
              done={task.done}
              id={task._id}
            />
          ))
        )}
      </div>
    </div>
  );
}

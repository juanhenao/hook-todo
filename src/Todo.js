import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

export default function Todo() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [id, setId] = useState(0);

  function addTask(e) {
    setTasks([...tasks, { id, description: task, done: false }]);
    setId(id + 1);
    setTask("");
    e.preventDefault();
  }

  function handleChange(e) {
    setTask(e.target.value);
  }

  function handleClick(e) {
    const targetId = e.target.id * 1;
    const newList = tasks.map(elem => {
      if (targetId === elem.id) {
        return { id: elem.id, description: elem.description, done: !elem.done };
      } else {
        return elem;
      }
    });
    setTasks(newList);
  }

  function useRenderElements() {
    return (
      <ul className="list-group">
        {tasks.map(elem => (
          <li
            style={elem.done ? { textDecoration: "line-through" } : {}}
            key={elem.id}
            id={elem.id}
            className="list-group-item"
            onClick={handleClick}
          >
            {elem.description}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div>
      <h1>Task list</h1>
      {useRenderElements()}
      <form onSubmit={addTask}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="New task"
            aria-label="New task"
            aria-describedby="button-add"
            value={task}
            onChange={handleChange}
          />
          <div className="input-group-append">
            <input
              className="btn btn-outline-secondary"
              type="submit"
              id="button-add"
              value="+"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

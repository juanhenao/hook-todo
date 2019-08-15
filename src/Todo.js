import React, { useState } from "react";
import { List, Map } from "immutable";

import MaterialList from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";

export default function Todo() {
  const [tasks, setTasks] = useState(List());
  const [task, setTask] = useState("");
  const [id, setId] = useState(0);

  function addTask(e) {
    setTasks(tasks.push(Map({ id, description: task, done: false })));
    setId(id + 1);
    setTask("");
    e.preventDefault();
  }

  function handleChange(e) {
    setTask(e.target.value);
  }

  function handleClick(e) {
    const targetId = e.target.id * 1;
    const index = tasks.findIndex(elem => elem.get("id") === targetId);
    const t = tasks.get(index);
    setTasks(tasks.set(index, t.set("done", !t.get("done"))));
  }

  function renderElements() {
    console.log(tasks);
    return (
      <MaterialList component="nav" aria-label="main mailbox folders">
        {tasks.map(elem => (
          <ListItem
            button
            style={elem.get("done") ? { textDecoration: "line-through" } : {}}
            key={elem.get("id")}
            id={elem.get("id")}
            onClick={handleClick}
          >
            {elem.get("description")}
          </ListItem>
        ))}
      </MaterialList>
    );
  }

  return (
    <div>
      <h1>Task list</h1>
      {renderElements()}
      <form onSubmit={addTask}>
        <TextField
          id="standard-with-placeholder"
          label="New Task"
          value={task}
          margin="normal"
          onChange={handleChange}
        />
      </form>
    </div>
  );
}

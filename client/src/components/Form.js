import axios from "axios";
import React, { useEffect, useState } from "react";
import { ENDPOINT } from "../constants";
import Todo from "./Todo";
import FilterButton from "./FilterButton";
import { FILTER_MAP } from "../constants";


const FILTER_NAMES = Object.keys(FILTER_MAP);

function Form() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  function handleChange(e) {
    setTask(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (task) {
      axios
        .post(ENDPOINT + "api/task", {
          task: task,
          status: false,
        })
        .then((res) => {
          setTask("");
        });
    }
  }

  useEffect(() => {
    axios
      .get(ENDPOINT + "api/tasks", {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        setTasks(res.data);
      });
  }, [task]);

  const updateTask = (id, newName) => {
    axios
      .put(ENDPOINT + "api/editTask/" + id, {
        task: newName,
      })
      .then((res) => {
        setTask(" ");
      });
  };

  const toggleTaskCompletion = (id) => {
    axios.put(ENDPOINT + "api/tasks/" + id).then((res) => {
      setTask("");
    });
  };

  const deleteTask = (id) => {
    axios
      .delete(ENDPOINT + "api/deleteTask/" + id, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        setTask(" ");
      });
  };

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task._id}
        name={task.task}
        completed={task.status}
        key={task._id}
        toggleTaskCompleted={toggleTaskCompletion}
        deleteTask={deleteTask}
        editTask={updateTask}
      />
    ));

  return (
    <>
      <form class="stack-small" onSubmit={handleSubmit}>
        <h2 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label__lg">
            What needs to be done?
          </label>
        </h2>
        <input
          type="text"
          id="new-todo-input"
          className="input input__lg"
          name="text"
          autoComplete="off"
          value={task}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn__primary btn__lg">
          Add
        </button>
      </form>

      <div className="filters btn-group stack-exception"> {filterList} </div>

      <h2 id="list-heading">{taskList.length} tasks remaining</h2>

      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </>
  );
}

export default Form;

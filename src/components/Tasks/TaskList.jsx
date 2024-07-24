import React, { useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import Task from "./Task";

const TaskList = ({ tasks, editTask, deleteTask, toggleTaskCompletion }) => {
  const [filter, setFilter] = useState("all");

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    return true;
  });

  const handleFilterChange = (val) => {
    setFilter(val);
  };

  return (
    <div className="m-5">
      <ButtonGroup onClick={(e) => handleFilterChange(e.target.value)}>
        <Button
          variant={filter === "all" ? "primary" : "outline-primary"}
          value="all"
        >
          All Tasks
        </Button>
        <Button
          variant={filter === "completed" ? "primary" : "outline-primary"}
          value="completed"
        >
          Completed Tasks
        </Button>
        <Button
          variant={filter === "active" ? "primary" : "outline-primary"}
          value="active"
        >
          Active Tasks
        </Button>
      </ButtonGroup>
      {filteredTasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          editTask={editTask}
          deleteTask={deleteTask}
          toggleTaskCompletion={toggleTaskCompletion}
        />
      ))}
    </div>
  );
};

export default TaskList;

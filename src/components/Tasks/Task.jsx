import React, { useState } from "react";
import { Button, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import TaskForm from "./TaskForm";

const Task = ({ task, editTask, deleteTask, toggleTaskCompletion }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <Card className="mb-3 mt-2">
      <Card.Body>
        {isEditing ? (
          <TaskForm
            editTask={editTask}
            initialValues={task}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        ) : (
          <>
            <div className="d-flex justify-content-between">
              <Card.Title>{task.title}</Card.Title>
              <OverlayTrigger
                overlay={
                  <Tooltip>
                    <strong>{`This task has a due date of ${task.dueDate}, and is marked as ${task.priority} priority.`}</strong>
                  </Tooltip>
                }
              >
                <img src="/info-circle-fill.svg" />
              </OverlayTrigger>
            </div>
            <Card.Text>{task.description}</Card.Text>
            <Button
              variant={task.completed ? "outline-secondary" : "outline-success"}
              size="sm"
              className="me-2"
              onClick={() => toggleTaskCompletion(task.id)}
            >
              {task.completed ? "Completed" : "Mark Complete"}
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="me-2"
              onClick={handleEdit}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default Task;

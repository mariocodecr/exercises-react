

import React from "react";
import { Task } from "../types";

interface TaskItemProps {
    task: Task

}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
    return (
      <div className="task-item">
        <div className="task-info">
            <h4>{task.title}</h4>
            <p>{task.date}</p>
        </div>
        <span className={`status ${task.status.toLowerCase()}`}>{task.status}</span>
      </div>
    )
}

export default TaskItem;
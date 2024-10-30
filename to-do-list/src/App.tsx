import React, { useState } from "react";
import './App.css';
import { tasks as tasksData } from "./data";
import TaskItem from "./components/TaskItem";

const App: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");

    const filteredTasks = tasksData.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="app">
            <h1>Todo List</h1>
            <input 
                type="text" 
                placeholder="Search" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar" 
            />
            <div className="task-list">
                {filteredTasks.map(task => (
                    <TaskItem key={task.id} task={task} />
                ))}
            </div>
        </div>
    );
};

export default App;

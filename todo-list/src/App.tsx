// src/App.tsx
import React, { useState } from 'react';
import './App.css';

interface Task {
    id: number;
    text: string;
    status: 'pending' | 'in-progress' | 'completed';
    deadline: string;
    isEditing: boolean;
}

const App: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState<string>('');
    const [newDeadline, setNewDeadline] = useState<string>('');

    const addTask = () => {
        if (newTask.trim()) {
            setTasks([
                ...tasks,
                {
                    id: Date.now(),
                    text: newTask,
                    status: 'pending',
                    deadline: newDeadline,
                    isEditing: false,
                },
            ]);
            setNewTask('');
            setNewDeadline('');
        }
    };

    const toggleEdit = (id: number) => {
        setTasks(tasks.map(task => 
            task.id === id ? { ...task, isEditing: !task.isEditing } : task
        ));
    };

    const updateTask = (id: number, text: string) => {
        setTasks(tasks.map(task => 
            task.id === id ? { ...task, text, isEditing: false } : task
        ));
    };

    const changeStatus = (id: number, status: Task['status']) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, status } : task
        ));
    };

    return (
        <div className="App">
            <h1>To-Do List</h1>
            <div className="task-input">
                <input
                    type="text"
                    placeholder="Add a task..."
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <input
                    type="date"
                    value={newDeadline}
                    onChange={(e) => setNewDeadline(e.target.value)}
                />
                <button onClick={addTask}>Add Task</button>
            </div>
            <ul className="task-list">
                {tasks.map((task) => (
                    <li key={task.id} className={`task ${task.status}`}>
                        {task.isEditing ? (
                            <input
                                type="text"
                                value={task.text}
                                onChange={(e) => updateTask(task.id, e.target.value)}
                                onBlur={() => toggleEdit(task.id)}
                            />
                        ) : (
                            <span onClick={() => toggleEdit(task.id)}>{task.text}</span>
                        )}
                        <span className="deadline">{task.deadline}</span>
                        <select
                            value={task.status}
                            onChange={(e) => changeStatus(task.id, e.target.value as Task['status'])}
                        >
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;

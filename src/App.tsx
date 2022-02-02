import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValueType = 'All' | 'Active' | 'Completed';

function App() {

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Redux", isDone: false}
    ])
    const [filterValue, setFilterValue] = useState<FilterValueType>('All');
    const removeTask = (taskID: string) => {
        setTasks(tasks.filter(t => t.id !== taskID));
    }
    const getFilteredTasks = (filterValue: FilterValueType): TaskType[] => {
        switch (filterValue) {
            case "Active":
                return tasks.filter(t => !t.isDone);
            case "Completed":
                return tasks.filter(t => t.isDone);
            default:
                return tasks;
        }
    }
    const filteredTasks = getFilteredTasks(filterValue);

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={filteredTasks}
                removeTask={removeTask}
                setFilterValue={setFilterValue}
            />
        </div>
    );
}

export default App;

import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TodoListType = {
    id: string
    title: string
    filterValue: FilterValueType
}
export type TaskStateType = {
    [key: string]: TaskType[]
}
export type FilterValueType = 'All' | 'Active' | 'Completed';

function App() {

    const todoList_1 = v1();
    const todoList_2 = v1();
    const todoList_3 = v1();

    const [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todoList_1, title: 'What to learn', filterValue: 'All'},
        {id: todoList_2, title: 'What to buy', filterValue: 'All'},
        {id: todoList_3, title: 'What to read', filterValue: 'All'}
    ]);
    const [tasks, setTasks] = useState<TaskStateType>({
        [todoList_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Redux", isDone: false}
        ]
        ,
        [todoList_2]: [
            {id: v1(), title: 'MILK', isDone: true},
            {id: v1(), title: 'BREAD', isDone: true},
            {id: v1(), title: 'BEER', isDone: false}
        ]
        ,
        [todoList_3]: [
            {id: v1(), title: "HEAD FIRS'T", isDone: false},
            {id: v1(), title: "THE DEFINITIVE GUIDE", isDone: false}
        ]
    })

    // const [filterValue, setFilterValue] = useState<FilterValueType>('All');
    const removeTask = (todoListID: string, taskID: string) => {
        setTasks({...tasks, [todoListID]: [...tasks[todoListID].filter(t => t.id !== taskID)]});
    }
    const addTask = (todoListID: string, title: string) => {
        let newTask = {id: v1(), title, isDone: false};
        setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]});
    }
    const changeTaskStatus = (todoListID: string, taskID: string, status: boolean) => {
        setTasks({
            ...tasks,
            [todoListID]: [...tasks[todoListID].map(t => t.id === taskID ? {...t, isDone: status} : t)]
        });
    }
    const changeFilterValue = (todoListID: string, filterValue: FilterValueType) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filterValue} : tl))
    }
    const getFilteredTasks = (todoList: TodoListType): TaskType[] => {
        switch (todoList.filterValue) {
            case "Active":
                return tasks[todoList.id].filter(t => !t.isDone);
            case "Completed":
                return tasks[todoList.id].filter(t => t.isDone);
            default:
                return tasks[todoList.id];
        }
    }
    const filteredTodoLists = todoLists.map(tl => {
        const taskForRender = getFilteredTasks(tl);
        return (
            <Todolist
                key={tl.id}
                todoListID={tl.id}
                title={tl.title}
                tasks={taskForRender}
                removeTask={removeTask}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                filterValue={tl.filterValue}
                changeFilterValue={changeFilterValue}
            />
        )
    })

    return (
        <div className="App">
            {filteredTodoLists}
        </div>
    );
}

export default App;

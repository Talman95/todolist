import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {Container, Grid, Paper} from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {
    AddTodoListAC,
    ChangeFilterValueAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todoListsReducer
} from "./store/todolists-reducer";
import {AddTaskAC, ChangeStatusAC, ChangeTaskTitleAC, RemoveTaskAC, tasksReducer} from "./store/tasks-reducer";

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

export const AppWithReducers = () => {

    const todoList_1 = v1();
    const todoList_2 = v1();
    const todoList_3 = v1();

    const [todoLists, dispatchForTodoLists] = useReducer(todoListsReducer, [
        {id: todoList_1, title: 'What to learn', filterValue: 'All'},
        {id: todoList_2, title: 'What to buy', filterValue: 'All'},
        {id: todoList_3, title: 'What to read', filterValue: 'All'}
    ])
    const [tasks, dispatchForTasks] = useReducer(tasksReducer, {
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

    // function for Tasks
    const removeTask = (todoListID: string, taskID: string) => {
        const action = RemoveTaskAC(todoListID, taskID)
        dispatchForTasks(action)
    }
    const addTask = (todoListID: string, title: string) => {
        const action = AddTaskAC(todoListID, title)
        dispatchForTasks(action)
    }
    const changeTaskStatus = (todoListID: string, taskID: string, status: boolean) => {
        const action = ChangeStatusAC(todoListID, taskID, status)
        dispatchForTasks(action)
    }
    const changeTaskTitle = (todoListID: string, taskID: string, title: string) => {
        const action = ChangeTaskTitleAC(todoListID, taskID, title)
        dispatchForTasks(action)
    }
    const changeFilterValue = (todoListID: string, filterValue: FilterValueType) => {
        const action = ChangeFilterValueAC(todoListID, filterValue)
        dispatchForTodoLists(action)
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

    // function for TodoLists
    const removeTodoList = (todoListID: string) => {
        const action = RemoveTodoListAC(todoListID)
        dispatchForTodoLists(action)
        dispatchForTasks(action)
    }
    const addTodoList = (title: string) => {
        const action = AddTodoListAC(title)
        dispatchForTodoLists(action)
        dispatchForTasks(action)
    }
    const changeTodoListTitle = (todoListID: string, title: string) => {
        dispatchForTodoLists(ChangeTodoListTitleAC(todoListID, title))
    }

    const todoListsComponents = todoLists.map(tl => {
        const tasksForRender = getFilteredTasks(tl);
        return (
            <Grid item key={tl.id}>
                <Paper
                    elevation={8}
                    style={{padding: "10px"}}
                >
                    <Todolist
                        todoListID={tl.id}
                        title={tl.title}
                        filterValue={tl.filterValue}
                        tasks={tasksForRender}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        changeFilterValue={changeFilterValue}
                        changeTaskTitle={changeTaskTitle}
                        removeTodoList={removeTodoList}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <div className={"App"}>
            <AppBar position={"static"}>
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge={"start"} color={"inherit"} aria-label={"menu"}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant={"h6"}>
                        TodoLists
                    </Typography>
                    <Button color={"inherit"} variant={"outlined"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid
                    container
                    justifyContent={"space-around"}
                    style={{padding: "20px 0"}}
                >
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container
                      spacing={6}
                      justifyContent={"center"}
                >
                    {todoListsComponents}
                </Grid>
            </Container>
        </div>
    );
}

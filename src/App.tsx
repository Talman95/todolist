import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from "./AddItemForm";
import {Container, Grid, Paper} from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {
    addTodoListAC,
    fetchTodoLists,
    setTodoListsAC,
    TodoListsActionType,
    TodoListsStateType
} from "./store/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./store/store";
import {Dispatch} from "redux";
import {todolistAPI} from "./api/todolist-api";

export const App = () => {

    const todoLists = useSelector<AppStateType, TodoListsStateType[]>(state => state.todoLists)
    const dispatch = useDispatch<Dispatch<any>>()

    useEffect(() => {
        dispatch(fetchTodoLists())
    }, [])

    const addTodoList = useCallback((title: string) => {
        const action = addTodoListAC(title)
        dispatch(action)
    }, [dispatch])

    const todoListsComponents = todoLists.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper
                    elevation={8}
                    style={{padding: "10px"}}
                >
                    <Todolist todoListID={tl.id}/>
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

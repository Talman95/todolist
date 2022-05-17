import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from '../components/TodoList/Todolist';
import {AddItemForm} from "../components/common/AddItemForm/AddItemForm";
import {Container, Grid, LinearProgress, Paper} from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {addTodoListTC, fetchTodoLists, TodoListsStateType} from "../components/TodoList/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../store/store";
import {Dispatch} from "redux";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {RequestStatusType} from "./app-reducer";

type AppPropsType = {
    demo?: boolean
}

export const App = ({demo = false}) => {
    const todoLists = useSelector<AppStateType, TodoListsStateType[]>(state => state.todoLists)
    const status = useSelector<AppStateType, RequestStatusType>(state => state.app.status)
    const dispatch = useDispatch<Dispatch<any>>()

    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(fetchTodoLists())
    }, [])

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListTC(title))
    }, [dispatch])

    const todoListsComponents = todoLists.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper
                    elevation={8}
                    style={{padding: "10px"}}
                >
                    <Todolist todoListID={tl.id} demo={demo} entityStatus={tl.entityStatus}/>
                </Paper>
            </Grid>
        )
    })

    return (
        <div className={"App"}>
            <ErrorSnackbar/>
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
                {status === 'loading' && <LinearProgress />}
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

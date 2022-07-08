import React, {useEffect} from 'react';
import './App.css';
import {CircularProgress, Container, LinearProgress} from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {useAppDispatch, useAppSelector} from "./hooks/hooks";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Login} from "../features/Login/Login";
import {TodoListsContainer} from "../features/TodoListsContainer/TodoListsContainer";
import {initializeApp} from "./app-reducer";

type AppPropsType = {
    demo?: boolean
}

export const App = ({demo = false}) => {
    const status = useAppSelector(state => state.app.status)
    const isInitialized = useAppSelector(state => state.app.isInitialized)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializeApp())
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <BrowserRouter>
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
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
                <Container fixed>
                    <Routes>
                        <Route path={'/'} element={<TodoListsContainer demo={demo}/>}/>
                        <Route path={'/login'} element={<Login/>}/>
                        <Route path={'*'} element={<h1>404: PAGE NOT FOUND</h1>}/>
                    </Routes>
                </Container>
            </div>
        </BrowserRouter>
    );
}

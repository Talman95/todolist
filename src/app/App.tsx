import React, {useEffect} from 'react';
import './App.css';
import {
    CircularProgress,
    Container,
    LinearProgress,
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {useAppDispatch, useAppSelector} from "./hooks/hooks";
import {Route, Routes} from 'react-router-dom';
import {authActions, Login} from "../features/Auth";
import {TodoListsContainer} from "../features/TodoLists";
import {selectIsInitialized, selectStatus} from "./selectors";
import {authSelectors} from "../features/Auth";
import {useActions} from "./hooks/useActions";
import {appActions} from './'

type AppPropsType = {
    demo?: boolean
}

export const App = ({demo = false}) => {
    const status = useAppSelector(selectStatus)
    const isInitialized = useAppSelector(selectIsInitialized)
    const isLoggedIn = useAppSelector(authSelectors.selectIsLoggedIn)
    const {logout} = useActions(authActions)
    const {initializeApp} = useActions(appActions)

    useEffect(() => {
        initializeApp()
    }, [])

    const logoutHandler = () => {
        logout()
    }

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className={"App"}>
            <ErrorSnackbar/>
            <AppBar position={"static"}>
                {isLoggedIn
                    ?
                    <Toolbar style={{justifyContent: "space-between"}}>
                        <IconButton edge={"start"} color={"inherit"} aria-label={"menu"}>
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant={"h6"}>
                            TodoLists
                        </Typography>
                        <Button color={"inherit"} variant={"outlined"} onClick={logoutHandler}>Logout</Button>
                    </Toolbar>
                    :
                    <Toolbar style={{justifyContent: "center"}}>
                        <Typography variant={"h6"}>
                            TodoLists
                        </Typography>
                    </Toolbar>
                }
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
    )
}
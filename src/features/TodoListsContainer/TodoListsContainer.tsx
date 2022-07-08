import React, {FC, useCallback, useEffect} from 'react';
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {addTodoList, fetchTodoLists} from "./todolists-reducer";
import {Todolist} from "./TodoList/Todolist";
import {useAppDispatch, useAppSelector} from "../../app/hooks/hooks";
import {useNavigate} from "react-router-dom";

type TodoListsContainerType = {
    demo?: boolean
}

export const TodoListsContainer: FC<TodoListsContainerType> = ({demo}) => {
    const todoLists = useAppSelector(state => state.todoLists)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()
    let navigate = useNavigate()

    useEffect(() => {
        if (demo || isLoggedIn) {
            return
        }
        dispatch(fetchTodoLists())
    }, [])

    const addTodoListHandler = useCallback((title: string) => {
        dispatch(addTodoList(title))
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

    if (!isLoggedIn) {
        navigate('/login')
    }

    return (
        <>
            <Grid
                container
                justifyContent={"space-around"}
                style={{padding: "20px 0"}}
            >
                <AddItemForm addItem={addTodoListHandler}/>
            </Grid>
            <Grid container
                  spacing={6}
                  justifyContent={"center"}
            >
                {todoListsComponents}
            </Grid>
        </>
    );
};
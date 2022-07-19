import React, {FC, useCallback, useEffect} from 'react';
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./TodoList/Todolist";
import {useAppSelector} from "../../app/hooks/hooks";
import {Navigate} from "react-router-dom";
import {authSelectors} from "../Auth";
import {selectTodoLists} from "./selectors";
import {useActions} from "../../app/hooks/useActions";
import {todoListsActions} from "./index";

type TodoListsContainerType = {
    demo?: boolean
}

export const TodoListsContainer: FC<TodoListsContainerType> = ({demo}) => {
    const todoLists = useAppSelector(selectTodoLists)
    const isLoggedIn = useAppSelector(authSelectors.selectIsLoggedIn)
    const {addTodoList, fetchTodoLists} = useActions(todoListsActions)

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        fetchTodoLists()
    }, [])

    const addTodoListHandler = useCallback((title: string) => {
        addTodoList(title)
    }, [])

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
        return <Navigate to={'/login'}/>
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
import React, {FC, useCallback, useEffect} from 'react';
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {addTodoList, fetchTodoLists} from "./todolists-reducer";
import {Todolist} from "./TodoList/Todolist";
import {useAppDispatch, useAppSelector} from "../../app/hooks/hooks";

type TodoListsContainerType = {
    demo?: boolean
}

export const TodoListsContainer: FC<TodoListsContainerType> = ({demo}) => {
    const todoLists = useAppSelector(state => state.todoLists)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (demo) {
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
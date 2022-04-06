import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";


export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistAPI.getTodolists()
            .then(response => {
                setState(response.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const title = 'Hellooo!'
        todolistAPI.createTodolist(title)
            .then(response => {
                setState(response.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)

    const todoListID = '01bd27ee-4a5b-4feb-85c7-376122c7de3c'

    useEffect(() => {
        todolistAPI.deleteTodolist(todoListID)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)

    const todoListID = 'd781d54f-25b3-40d8-a226-37ff09e1eadd'
    const title = 'My todolist! Yo!'

    useEffect(() => {
        todolistAPI.updateTodolist(todoListID, title)
            .then(res => {
                setState(res.data)
                debugger
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
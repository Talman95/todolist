import React, {useEffect, useState} from 'react'
import {todolistAPI} from "./todolist-api";


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
    const [title, setTitle] = useState('')

    const createTodo = () => {
        todolistAPI.createTodolist(title)
            .then(response => {
                setState(response.data)
            })
    }

    return <div>
        <input value={title} placeholder={'todoID'} onChange={(e) => setTitle(e.currentTarget.value)}/>
        <button onClick={createTodo}>Create TodoList</button>
        <div>
            {JSON.stringify(state)}
        </div>
    </div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todoID, setTodoID] = useState('')

    const deleteTodo = () => {
        todolistAPI.deleteTodolist(todoID)
            .then(res => {
                setState(res.data)
            })
    }

    return <div>
        <input value={todoID} placeholder={'todoID'} onChange={(e) => setTodoID(e.currentTarget.value)}/>
        <button onClick={deleteTodo}>Delete TodoList</button>
        <div>
            {JSON.stringify(state)}
        </div>
    </div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todoID, setTodoID] = useState('')
    const [title, setTitle] = useState('')

    const updateTodo = () => {
        todolistAPI.updateTodolist(todoID, title)
            .then(res => {
                setState(res.data)
            })
    }

    return <div>
        <input value={todoID} placeholder={'todoID'} onChange={(e) => setTodoID(e.currentTarget.value)}/>
        <input value={title} placeholder={'title'} onChange={(e) => setTitle(e.currentTarget.value)}/>
        <button onClick={updateTodo}>Update TodoList</button>
        <div>
            {JSON.stringify(state)}
        </div>
    </div>
}

export const GetTasksForTodolist = () => {
    const [state, setState] = useState<any>(null)

    const todoListID = '5be6013f-6546-4159-8468-feddcf9d9a45'

    useEffect(() => {
        todolistAPI.getTasks(todoListID)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todoID, setTodoID] = useState('')
    const [title, setTitle] = useState('')

    const createTask = () => {
        todolistAPI.createTask(todoID, title)
            .then(res => {
                setState(res.data)
            })
    }

    return <div>
        <input value={todoID} placeholder={'todoListID'} onChange={(e) => setTodoID(e.currentTarget.value)}/>
        <input value={title} placeholder={'title'} onChange={(e) => setTitle(e.currentTarget.value)}/>
        <button onClick={createTask}>Create Task</button>
        <hr/>
        <div> {JSON.stringify(state)}</div>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const todoID = 'd781d54f-25b3-40d8-a226-37ff09e1eadd'
    const [taskID, setTaskID] = useState('')

    const deleteTask = () => {
        todolistAPI.deleteTask(todoID, taskID)
            .then(res => {
                setState(res.data)
            })
    }

    return <div>
        <input value={todoID} placeholder={'todoListID'}/>
        <input value={taskID} placeholder={'taskID'} onChange={(e) => setTaskID(e.currentTarget.value)}/>
        <button onClick={deleteTask}>Delete Task</button>
        <hr/>
        <div> {JSON.stringify(state)}</div>
    </div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const todoID = 'd781d54f-25b3-40d8-a226-37ff09e1eadd'
    const [taskID, setTaskID] = useState('')
    const newTask = {
        title: 'update update update update',
        description: null,
        status: 0,
        priority: 1,
        startDate: null,
        deadline: null,
    }

    const updateTask = () => {
        todolistAPI.updateTask(todoID, taskID, newTask)
            .then(res => {
                setState(res.data)
            })
    }

    return <div>
        <input value={todoID} placeholder={'todoListID'}/>
        <input value={taskID} placeholder={'taskID'} onChange={(e) => setTaskID(e.currentTarget.value)}/>
        <button onClick={updateTask}>Update Task</button>
        <hr/>
        <div> {JSON.stringify(state)}</div>
    </div>
}
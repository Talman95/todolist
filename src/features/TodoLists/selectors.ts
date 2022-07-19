import {RootState} from "../../store/store";

// all todoLists
export const selectTodoLists = (state: RootState) => (state.todoLists)
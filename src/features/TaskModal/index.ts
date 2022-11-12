import {slice} from "./taskModal-reducer";
import {TaskModal} from "./TaskModal";

const taskModalReducer = slice.reducer
const taskModalActions = slice.actions

export {
    taskModalReducer,
    taskModalActions,
    TaskModal,
}
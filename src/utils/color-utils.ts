import {TaskPriorities} from "../api/types";
import {ColorType} from "../types/types";


export const colorUtils = (priority: TaskPriorities): ColorType => {
    let color: ColorType = 'default'

    switch (priority) {
        case 0:
            color = 'success'
            break
        case 1:
            color = 'secondary'
            break
        case 2:
            color = 'warning'
            break
        case 3:
            color = 'error'
            break
        case 4:
            color = 'default'
            break
    }

    return color
}

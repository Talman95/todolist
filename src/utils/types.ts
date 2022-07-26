import {FieldsErrorsType} from "../api/todolist-api";

export type ThunkErrorType = {
    rejectValue: {
        errors: Array<string>
        fieldsErrors?: Array<FieldsErrorsType>
    }
}
import {FieldsErrorsType} from "../api/types";
import {rootReducer, store} from "../store/store";

// redux common types
export type RootReducerType = typeof rootReducer
// определить автоматически тип всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch
export type ThunkErrorType = { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldsErrorsType> } }
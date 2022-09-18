import * as appSelectors from './selectors'
import {asyncActions, slice} from './app-reducer'
import {RequestStatusType as RST} from './app-reducer'

const appReducer = slice.reducer
const actions = slice.actions

const appActions = {
    ...asyncActions,
    ...actions,
}

//exports
export type RequestStatusType = RST

export {
    appSelectors,
    appActions,
    appReducer,
}
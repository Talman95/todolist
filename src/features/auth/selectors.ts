import {RootState} from "../../types/types";


export const selectIsLoggedIn = (state: RootState) => (state.auth.isLoggedIn)

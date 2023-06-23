// Use throughout your app instead of plain `useDispatch` and `useSelector`
import {AppDispatchType} from "../types/types";
import {useDispatch} from "react-redux";

export const useAppDispatch: () => AppDispatchType = useDispatch

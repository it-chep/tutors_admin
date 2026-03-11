import { bindActionCreators } from "@reduxjs/toolkit"
import { useAppDispatch } from "../../../../app/store/store"
import { TutorSlice } from "../../model/reducers/TutorSlice"




export const useTutorActions = () => {
    const dispatch = useAppDispatch()
    return bindActionCreators(TutorSlice.actions, dispatch)
}
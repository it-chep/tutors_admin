import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITutorChange, ITutorInitState } from "../types";



const init: ITutorInitState = {
    tutor: {
        full_name: '',
        subject_id: -1,
        cost_per_hour: '',
        tg: '',
        tg_admin_username: '',
        tg_admin_username_id: -1,
        email: '',
        phone: '',  
    },
    isLoading: true,
    error: ''
}

export const TutorSlice = createSlice({
    name: 'tutor',
    initialState: init,
    reducers: {
        setIsLoading(state, action: PayloadAction<boolean>){
            state.isLoading = action.payload;
        },
        setInit(state, action: PayloadAction<void>){
            state.tutor = init.tutor;
        },
        setTutor(state, action: PayloadAction<ITutorChange>){
            state.tutor = action.payload;
        },
        setFullName(state, action: PayloadAction<string>){
            state.tutor.full_name = action.payload;
        },
        setCostPerHour(state, action: PayloadAction<string>){
            state.tutor.cost_per_hour = action.payload;
        },
        setPhone(state, action: PayloadAction<string>){
            state.tutor.phone = action.payload;
        },
        setTg(state, action: PayloadAction<string>){
            state.tutor.tg = action.payload;
        },
        setSubjectId(state, action: PayloadAction<number>){
            state.tutor.subject_id = action.payload;
        },
        setEmail(state, action: PayloadAction<string>){
            state.tutor.email = action.payload;
        },
        setTgAdminUsernameId(state, action: PayloadAction<number>){
            state.tutor.tg_admin_username_id = action.payload;
        },
        setTgAdminUsername(state, action: PayloadAction<string>){
            state.tutor.tg_admin_username = action.payload;
        },

    }
})

export default TutorSlice.reducer
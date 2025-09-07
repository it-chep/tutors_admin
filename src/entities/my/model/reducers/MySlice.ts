import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MyInitialState } from "./MyState";


export const MySlice = createSlice({
    name: 'my',
    initialState: MyInitialState,
    reducers: {
        setIsLoading(state, action: PayloadAction<boolean>){
            state.isLoading = action.payload;
        },
        setError(state, action: PayloadAction<string>){
            state.error = action.payload;
        },
        setIsAuth(state, action: PayloadAction<boolean>){
            state.my.isAuth = action.payload;
        },
        setEmail(state, action: PayloadAction<string>){
            state.my.email = action.payload;
        },
    }
})

export const myReducer =  MySlice.reducer
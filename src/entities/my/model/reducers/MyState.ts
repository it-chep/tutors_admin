import { IMyInitialState } from "../types";



export const MyInitialState: IMyInitialState = {
    my: {
        id: -1,
        email: '',
        isAuth: false,
        role: 'super_admin',
    },
    isLoading: false,
    error: ''
} 
import { IMyInitialState } from "../types";


export const MyInitialState: IMyInitialState = {
    my: {
        id: -1,
        email: '',
        isAuth: false,
        role: 'tutor',
        paid_functions: {
            assistant: false,
            finance_by_tgs: false,
            student_archive: false,
            payment_landing: false,
        },
    },
    isLoading: false,
    error: ''
} 
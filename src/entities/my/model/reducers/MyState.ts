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
            change_all_students_payment: false,
            tutor_archive: false,
            tutor_filter_by_tg: false,
            tutor_update: false,
            student_comments: false,
            manual_transaction: false,
            gph: false,
            can_penalize_assistants: false,
            
        },
    },
    isLoading: false,
    error: ''
} 
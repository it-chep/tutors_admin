
export type TRole = "tutor" | "admin" | "super_admin" | "assistant"

export type TPaidFunctionForthEtap = "tutor_archive" | "change_all_students_payment" | "tutor_filter_by_tg" | 
"tutor_update" | "student_comments" | "manual_transaction" | "gph" | "can_penalize_assistants"

export type TPaidFunction = "finance_by_tgs" | "student_archive" | "assistant" | "payment_landing" | TPaidFunctionForthEtap

export interface IMy {
    id: number;
    role: TRole,
    email: string;
    isAuth: boolean;
    paid_functions: Record<TPaidFunction, boolean>;
}

export interface IMyInitialState {
    my: IMy;
    isLoading: boolean;
    error: string;
}


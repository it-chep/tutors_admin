
export type TRole = "tutor" | "admin" | "super_admin" | "assistant"
export type TPaidFunction = "finance_by_tgs" | "student_archive" | "assistant"

export interface IMy {
    id: number;
    role: TRole,
    email: string;
    isAuth: boolean;
    paid_functions: Map<TPaidFunction, boolean>;
}

export interface IMyInitialState {
    my: IMy;
    isLoading: boolean;
    error: string;
}


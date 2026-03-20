


export interface ITutor {
    id: number;
    full_name: string;
    tg: string;
    is_failer: boolean;
    has_balance_negative: boolean;
    has_only_trial: boolean;
    has_newbie: boolean;
    tg_admin_username?: string;
}

export interface ITutorData {
    id: number;
    full_name: string;
    tg: string;
    email: string;
    phone: string;
    subject_name: string;
    subject_id: number;
    cost_per_hour: string;
    created_at?: string;
    tg_admin_username?: string;
    tg_admin_username_id?: number;
    is_archive?: boolean;
}

export interface ITutorFinance {
    amount: string;
    hours_count: number;
    wages: number;
}

export interface ITutorChange {
    id?: number;
    full_name: string;
    cost_per_hour: string;
    phone: string;
    tg: string;
    subject_id: number;
    email: string;
    tg_admin_username: string;
    tg_admin_username_id: number;
}

export interface ILessonTutor {
    id: number;
    student_id: number;
    tutor_id: number;
    student_full_name: string;   
    date: string;
    duration_minutes: number;
}

export interface ITutorInitState {
    tutor: ITutorChange;
    isLoading: boolean;
    error: string;
}

export interface ITutorAccrual {
    id: number;
    date: string;
    amount: string;
    is_receipt: boolean;
}
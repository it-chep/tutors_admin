


export interface ITutor {
    id: number;
    full_name: string;
    tg: string;
    created_at: string;
    has_balance_negative: boolean;
    has_only_trial: boolean;
    has_newbie: boolean;
    tg_admin_username?: string;
}

export interface ITutorData {
    id: number;
    full_name: string;
    tg: string;
    phone: string;
    subject_name: string;
    subject_id: number;
    cost_per_hour: string;
    created_at?: string;
    tg_admin_username?: string;
    is_archive?: boolean;
}

export interface ITutorUpdate {
    full_name: string;
    phone: string;
    tg: string;
    cost_per_hour: string;
    subject_id: number;
    tg_admin_username: string;
}

export interface ITutorFinance {
    amount: string;
    hours_count: number;
    wages: number;
}

export interface ITutorCreate {
    full_name: string;
    cost_per_hour: string;
    phone: string;
    tg: string;
    subject_id: number;
    email: string;
    admin_id: number;
    tg_admin_username: string;
}



export interface ILessonTutor{
    id: number;
    student_id: number;
    tutor_id: number;
    student_full_name: string;   
    date: string;
    duration_minutes: number;
}
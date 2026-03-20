
export interface ITgAdminUsername {
    id: number;
    name: string;
}

export interface IStudent {
    id: number;
    first_name: string;
    last_name: string;
    middle_name: string;
    tg: string;
    parent_full_name: string;
    is_only_trial_finished: boolean;
    is_balance_negative: boolean;
    is_newbie: boolean;
    balance: string;
    payment_name: string;
    comments_count: number;
}

export interface IStudentData {
    id: number;
    first_name: string;
    last_name: string;
    middle_name: string;
    phone: string;
    tg: string;
    cost_per_hour: string;
    subject_name : string;
    subject_id: number;
    tutor_name: string;
    tutor_id: number;
    parent_full_name: string;
    parent_phone: string;
    parent_tg: string;
    balance: string;
    is_only_trial_finished: boolean;
    is_balance_negative: boolean;
    tg_admin_username: string;
    payment_name: string;
    payment_id: number;
    is_newbie: boolean;
    tg_id?: number;
    is_archive: boolean;
    payment_url: string;
    created_at?: string;
}

export interface IStudentChange {
    id?: number,
    first_name: string;
    last_name: string;
    middle_name: string;
    phone: string;
    tg: string;
    cost_per_hour: string;
    subject_id: number;
    tutor_id: number;
    parent_full_name: string;
    parent_phone: string;
    parent_tg: string;
    tg_admin_username: string;
}

export interface IPayment {
    payment_id: number;
    payment_name: string;
}

export interface IStudentInitialState {
    student: IStudentChange;
    isLoading: boolean;
    error: string;
}

export interface IStudentFinance {
    count: number;
    amount: string;
    total_confirmed_amount?: string;
}

export interface ILesson {
    id: number;
    student_id: number;
    tutor_id: number;
    student_full_name: string;   
    date: string;
    duration_minutes: number;
}

export interface ITransaction {
    id: string;
    created_at: string;
    amount: string;
    is_confirmed: boolean;
    is_manual: boolean;
}

export interface INotification {
    id: number;
    created_at: string;
}


export interface IComment {
    id: number;
    text: string;
    author_full_name: string;
    created_at: string;
}
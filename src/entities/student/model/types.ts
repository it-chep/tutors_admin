
export interface IStudent {
    id: number;
    first_name: string;
    last_name: string;
    middle_name: string;
    tg: string;
    is_only_trial_finished: boolean;
    is_balance_negative: boolean;
    is_newbie: boolean;
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
    tutor_name: string;
    parent_full_name: string;
    parent_phone: string;
    parent_tg: string;
    balance: string;
    has_buttons: boolean;
    is_only_trial_finished: boolean;
    is_balance_negative: boolean;
    is_newbie: boolean;
}

export interface IStudentChange {
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
}

export interface IStudentInitialState {
    student: IStudentChange;
    isLoading: boolean;
    error: string;
}

export interface IStudentFinance {
    count: number;
    amount: string;
}
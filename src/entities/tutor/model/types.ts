


export interface ITutor {
    id: number;
    full_name: string;
    tg: string;
    has_balance_negative: boolean;
    has_only_trial: boolean;
    has_newbie: boolean;
}

export interface ITutorData {
    id: number;
    full_name: string;
    tg: string;
    phone: string;
    subject_name: string;
    cost_per_hour: string;
}

export interface ITutorFinance {
    conversion: number;
    amount: string;
    lessons_count: number;
    base_lessons: number;
    trial_lessons: number;
}

export interface ITutorCreate {
    full_name: string;
    cost_per_hour: string;
    phone: string;
    tg: string;
    subject_id: number;
}

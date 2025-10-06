


export interface IAdmin {
    id: number;
    full_name: string;
    tg: string;
}

export interface IAdminData {
    id: number;
    full_name: string;
    phone: string;
    tg: string;
}

export interface IAdminCreate {
    "full_name": string;
    "phone": string;
    "tg": string;
    "email": string;
}

export interface IAdminFinance {
    profit: string;
    cash_flow: string;
    conversion: number;
    lessons_count: number;
    base_lessons: number;
    trial_lessons: number;
}
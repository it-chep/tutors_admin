
export interface IAssistant {
    id: number;
    full_name: string;
    tg: string;
}

export interface IAssistantData {
    id: number;
    full_name: string;
    phone: string;
    tg: string;
    tg_admins_usernames: string[];
}

export interface IAssistantCreate {
    full_name: string;
    phone: string;
    tg: string;
    email: string;
    tg_admins_usernames: string[];
}

export interface IAssistant {
    id: number;
    full_name: string;
    tg: string;
}

export interface ITgAdminUsername {
    id: number;
    name: string;
}

export interface IAssistantData {
    id: number;
    full_name: string;
    phone: string;
    tg: string;
    tg_admins_usernames: ITgAdminUsername[];
    can_penalize_assistants: number[];
    created_at?: string;
    can_view_contracts: boolean;
}

export interface IAssistantCreate {
    full_name: string;
    phone: string;
    tg: string;
    email: string;
    tg_admins_usernames_ids: number[];
}
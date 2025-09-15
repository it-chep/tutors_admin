


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
    full_name: string;
    phone: string;
    tg: string;
}

export interface IAdminFinance{
    conversion: number;
    count: number;
    amount: string;
}
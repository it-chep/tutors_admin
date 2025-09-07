


export interface IMy {
    email: string;
    isAuth: boolean;
}

export interface IMyInitialState {
    my: IMy;
    isLoading: boolean;
    error: string;
}
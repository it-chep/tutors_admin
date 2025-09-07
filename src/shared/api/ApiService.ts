import { AuthError } from "../lib/helpers/AuthError";


export const fetchAuth = async (url: string, init?: RequestInit): Promise<Response> => {
    const newInit: RequestInit = {...init};

    newInit.headers = {
        ...newInit.headers,
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
    } 
    newInit.credentials = 'include'
    const res = await fetch(url, newInit)
    if(res.status === 401){
        throw new AuthError('Пользователь не авторизован', 401)
    }
    return res
}

import { fetchAuth } from "../../../shared/api/ApiService"
import { IMy } from "../model/types"



class MyService{

    
    async getInfo(): Promise<Omit<IMy, 'email' | 'isAuth'>> {
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/user')
        const {user}: {user: Omit<IMy, 'email' | 'isAuth'>} = await res.json()
        return user
    }

    async login(email: string, password: string){
        await fetch(process.env.REACT_APP_SERVER_URL + '/auth/login', {
            method: "POST",
            body: JSON.stringify({email, password})
        })
    }

    async register(email: string, password: string){
        await fetch(process.env.REACT_APP_SERVER_URL + '/auth/register', {
            method: "POST",
            body: JSON.stringify({email, password})
        })
    }
    
    async loginVerify(email: string, code: string){
        const res = await fetch(process.env.REACT_APP_SERVER_URL + '/auth/login/verify', {
            method: "POST",
            body: JSON.stringify({email, code}),
            credentials: 'include'
        })
        const {token} : {token: string} = await res.json()
        localStorage.setItem('auth_token', token)
    }

    async registerVerify(email: string, code: string){
        const res = await fetch(process.env.REACT_APP_SERVER_URL + '/auth/register/verify', {
            method: "POST",
            body: JSON.stringify({email, code}),
            credentials: 'include'
        })
        const {token} : {token: string} = await res.json()
        localStorage.setItem('auth_token', token)
    }

}

export const myService = new MyService()
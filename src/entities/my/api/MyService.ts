import { fetchAuth } from "../../../shared/api/ApiService"
import { AuthError } from "../../../shared/err/AuthError"
import { IMy, TPaidFunction } from "../model/types"



class MyService{
    
    async getInfo(): Promise<{user: Omit<IMy, 'email' | 'isAuth' | 'paid_functions'>, paidFunctions: Record<TPaidFunction, boolean>}> {
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/user')
        const {user, paidFunctions: paidFunctions}: {user: Omit<IMy, 'email' | 'isAuth'>, paidFunctions: Record<TPaidFunction, boolean>} = await res.json()
        return {user, paidFunctions}
    }

    async login(email: string, password: string){
        const res = await fetch(process.env.REACT_APP_SERVER_URL + '/auth/login', {
            method: "POST",
            body: JSON.stringify({email, password})
        })
        if(!res.ok && res.status === 400){
            const text = await res.text()
            throw new AuthError(text)
        }
    }

    async logout() {
        await fetchAuth(`${process.env.REACT_APP_SERVER_URL}/auth/logout`, {
            method: "POST"
        })
        localStorage.removeItem('auth_token')
    }

    async register(email: string, password: string){
        const res = await fetch(process.env.REACT_APP_SERVER_URL + '/auth/register', {
            method: "POST",
            body: JSON.stringify({email, password})
        })
        if(!res.ok && res.status === 400){
            const text = await res.text()
            throw new AuthError(text)
        }
    }
    
    async loginVerify(email: string, code: string){
        const res = await fetch(process.env.REACT_APP_SERVER_URL + '/auth/login/verify', {
            method: "POST",
            body: JSON.stringify({email, code}),
            credentials: 'include'
        })
        if(!res.ok && res.status === 400){
            const text = await res.text()
            throw new AuthError(text)
        }
        const {token} : {token: string} = await res.json()
        localStorage.setItem('auth_token', token)
    }

    async registerVerify(email: string, code: string){
        const res = await fetch(process.env.REACT_APP_SERVER_URL + '/auth/register/verify', {
            method: "POST",
            body: JSON.stringify({email, code}),
            credentials: 'include'
        })
        if(!res.ok && res.status === 400){
            const text = await res.text()
            throw new AuthError(text)
        }
        const {token} : {token: string} = await res.json()
        localStorage.setItem('auth_token', token)
    }
}

export const myService = new MyService()
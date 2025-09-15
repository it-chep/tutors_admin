import { fetchAuth } from "../../../shared/api/ApiService"
import { IMy, IMyFinance } from "../model/types"



class MyService{

    async getFinance(from: string, to: string): Promise<IMyFinance> {
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/finance', {
            method: "POST",
            body: JSON.stringify({
                from,
                to
            })
        })
        const {data}: {data: IMyFinance} = await res.json()
        return data
    }

    async getInfo(): Promise<Omit<IMy, 'email' | 'isAuth'>> {
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/user/info')
        const {user}: {user: Omit<IMy, 'email' | 'isAuth'>} = await res.json()
        return user
    }

    async login(email: string, password: string){
        await fetch(process.env.REACT_APP_SERVER_URL_ADMIN + '/auth/login', {
            method: "POST",
            body: JSON.stringify({email, password})
        })
    }
    
    async loginVerify(email: string, code: string){
        const res = await fetch(process.env.REACT_APP_SERVER_URL_ADMIN + '/auth/login/verify', {
            method: "POST",
            body: JSON.stringify({email, code})
        })
        const {token} : {token: string} = await res.json()
        localStorage.setItem('auth_token', token)
    }

    async registerVerify(email: string, code: string){
        const res = await fetch(process.env.REACT_APP_SERVER_URL_ADMIN + '/auth/register/verify', {
            method: "POST",
            body: JSON.stringify({email, code})
        })
        const {token} : {token: string} = await res.json()
        localStorage.setItem('auth_token', token)
    }

}

export const myService = new MyService()
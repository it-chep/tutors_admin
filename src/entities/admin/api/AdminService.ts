import { fetchAuth } from "../../../shared/api/ApiService"
import { IAdmin, IAdminCreate, IAdminData, IAdminFinance } from "../model/types"



class AdminService{
    async getAll(): Promise<IAdmin[]> {
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/admins')
        const {admins}: {admins: IAdmin[]} = await res.json()
        return admins
    }

    async get(id: number): Promise<IAdminData>{
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/admins/' + id)
        const {admin}: {admin: IAdminData} = await res.json()
        return admin
    }

    async delete(id: number){
        await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/admins/' + id, {
            method: "DELETE"
        })
    }

    async getFinance(from: string, to: string, admin_id: number): Promise<IAdminFinance> {
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/finance', {
            method: "POST",
            body: JSON.stringify({
                from,
                to,
                admin_id
            })
        })
        const {data}: {data: IAdminFinance} = await res.json()
        return data
    }
    
    async create(admin: IAdminCreate){
        await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/admins', {
            method: "POST",
            body: JSON.stringify(admin)
        })
    }
}

export const adminService = new AdminService()
import { fetchAuth } from "../../../shared/api/ApiService"
import { IAdmin, IAdminCreate, IAdminData, IAdminFinance } from "../model/types"



class AdminService{


    async getAll(): Promise<IAdmin[]> {
        // const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/admins')
        // const {admins}: {admins: IAdmin[]} = await res.json()
        return [
            {
               id: 1,
               full_name: 'asd sdsf fdv',
               tg: '/adssa/asdfd'
            },

        ]
    }

    async get(id: number): Promise<IAdminData>{
        // const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/admins/' + id)
        // const {admin}: {admin: IAdminData} = await res.json()
        return {
                "id": 1,
                full_name: 'Канарский Петр Андреевич',
                phone: '+79847849734',
                tg: '/sddssdsd/gdfs'
            }
    }

    async delete(id: number){
        await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/admins/' + id, {
            method: "DELETE"
        })
    }

    async getFinance(id: number, from: string, to: string): Promise<IAdminFinance> {
            // const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/tutors/' + id + '/finance', {
            //     method: "POST",
            //     body: JSON.stringify({
            //         from,
            //         to
            //     }),
            //     signal: this.controller.signal
            // })
            // const {data}: {data: ITutorFinance} = await res.json()
            await new Promise(resolve => setTimeout(resolve, 3000))
            return {
                "conversion": 30,
                "count": 23,
                "amount": "23"
            }
        }

    async create(admin: IAdminCreate){
        // await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/admins', {
        //     method: "POST",
        //     body: JSON.stringify(admin)
        // })
        await new Promise(resolve => setTimeout(resolve, 2000))
    }
}

export const adminService = new AdminService()
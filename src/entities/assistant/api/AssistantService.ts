import { fetchAuth } from "../../../shared/api/ApiService"
import { IAssistant, IAssistantCreate, IAssistantData } from "../model/types"



class AssistantService{

    async getAll(): Promise<IAssistant[]> {
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/assistant')
        const {assistants}: {assistants: IAssistant[]} = await res.json()
        return assistants
    }

    async get(id: number): Promise<IAssistantData>{
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/assistant/' + id)
        const {assistant}: {assistant: IAssistantData} = await res.json()
        return assistant
    }

    async add_available_tg(id: number, tg_admin_username_id: number) {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/assistant/' + id + '/add_available_tg', {
            method: 'POST',
            body: JSON.stringify({tg_admin_username_id})
        })
    }

    async delete_available_tg(id: number, tg_admin_username_id: number) {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/assistant/' + id + '/delete_available_tg', {
            method: 'POST',
            body: JSON.stringify({tg_admin_username_id})
        })
    }

    async delete(id: number){
        await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/assistant/' + id, {
            method: "DELETE"
        })
    }

    async create(assistant: IAssistantCreate){
        await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/assistant', {
            method: "POST",
            body: JSON.stringify(assistant)
        })
    }

    async changePermissionsGPH(assistantId: number, can_view_contracts: boolean){
        await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + `/assistants/${assistantId}/permissions_gph`, {
            method: "POST",
            body: JSON.stringify({can_view_contracts})
        })
    }

    async changePermissions(assistantId: number, can_penalize_assistants: number[]){
        await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + `/assistants/${assistantId}/permissions`, {
            method: "POST",
            body: JSON.stringify({can_penalize_assistants})
        })
    }
    

}

export const assistantService = new AssistantService()
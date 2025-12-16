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

}

export const assistantService = new AssistantService()
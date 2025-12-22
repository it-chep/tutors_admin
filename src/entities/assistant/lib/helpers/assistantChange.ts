import { IAssistantCreate } from "../../model/types"



export const assistantChange = (assistant: IAssistantCreate, setAssistant: (assistant: IAssistantCreate) => void) => {
    return {
        setFullName(full_name: string){
            setAssistant({...assistant, full_name})
        },
        setPhone(phone: string){
            setAssistant({...assistant, phone})
        },
        setEmail(email: string){
            setAssistant({...assistant, email})
        },
        setTg(tg: string){
            setAssistant({...assistant, tg})
        },
        setTgAdmins(tg_admins_usernames: string[]){
            setAssistant({...assistant, tg_admins_usernames})
        }
    }
}
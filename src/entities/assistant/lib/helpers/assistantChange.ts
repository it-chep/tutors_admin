import { IAssistantCreate } from "../../model/types"



export const assistantChange = (assistant: IAssistantCreate, setTutor: (assistant: IAssistantCreate) => void) => {
    return {
        setFullName(full_name: string){
            setTutor({...assistant, full_name})
        },
        setPhone(phone: string){
            setTutor({...assistant, phone})
        },
        setEmail(email: string){
            setTutor({...assistant, email})
        },
        setTg(tg: string){
            setTutor({...assistant, tg})
        },
    }
}
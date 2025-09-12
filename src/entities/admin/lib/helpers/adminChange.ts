import { IAdminCreate } from "../../model/types"



export const adminChange = (admin: IAdminCreate, setTutor: (admin: IAdminCreate) => void) => {
    return {
        setFullName(full_name: string){
            setTutor({...admin, full_name})
        },
        setPhone(phone: string){
            setTutor({...admin, phone})
        },
        setTg(tg: string){
            setTutor({...admin, tg})
        },
    }
}
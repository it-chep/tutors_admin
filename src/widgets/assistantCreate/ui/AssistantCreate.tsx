import { FC, useState } from "react";
import { AssistantChange } from "../../../features/assistantChange";
import { assistantChange, IAssistantCreate } from "../../../entities/assistant";
import { SelectedTgAdmins } from "../../../features/studentFilters";


export const AssistantCreate: FC = () => {

    const [assistant, setAssistant] = useState<IAssistantCreate>({
        "full_name": '',
        "phone": '',
        "tg": '',
        "email": '',
        "tg_admins_usernames": []
    })

    const {setTgAdmins} = assistantChange(assistant, setAssistant)

    return (
        <section>
            <AssistantChange 
                assistant={assistant}
                setAssistant={setAssistant}
            >
                <SelectedTgAdmins 
                    setTgAdmins={setTgAdmins}
                />
            </AssistantChange>
            
        </section>
    )
}
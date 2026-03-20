import { FC, useEffect, useState } from "react";
import classes from './assistantPermissions.module.scss'
import { assistantService, IAssistant } from "../../../entities/assistant";
import { useGlobalLoadingActions } from "../../../entities/globalLoading";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { useMyActions } from "../../../entities/my";
import { AuthError } from "../../../shared/err/AuthError";
import { DropDownListSelected } from "../../../shared/ui/dropDownSelected";
import { IItem } from "../../../shared/model/types";

interface IProps {
    assistantId: number;
    permissionsIds: number[];
    setPermissionsIds: (ids: number[]) => void;
}

export const AssistantPermissions: FC<IProps> = ({assistantId, permissionsIds, setPermissionsIds}) => {

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useMyActions()
    const [assistants, setAssistants] = useState<IAssistant[]>([])
    const {setIsLoading: setIsLoadingGlobal} = useGlobalLoadingActions()
    
    const getAssistants = async () => {
        try{
            setIsLoading(true)
            const assistantsRes = await assistantService.getAll()
            setAssistants(assistantsRes)
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: 'Ошибка при получении списка ассистентов', type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getAssistants()
    }, []) 


    const onChange = async (newIds: number[]) => {
        try{
            setIsLoadingGlobal(true)
            await assistantService.changePermissions(assistantId, newIds)
            setPermissionsIds(newIds)
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: 'Ошибка при смене прав штрафовать других ассистентов', type: 'error'})
            }
        }
        finally{
            setIsLoadingGlobal(false)
        }
    }

    const onSelected = (item: IItem) => {
        return (selected: boolean) => {
            let newIds = permissionsIds;
            if(selected){
                newIds = [...newIds, item.id]
            }
            else{
                newIds = [...newIds.filter(i => i !== item.id)]
            }
            onChange(newIds)
        }   
    }

    return (
        <section className={classes.container}>
            <section className={classes.title}>
                Права штрафовать других конкретных ассистентов
            </section>
            <section className={classes.dropDown}>
                <DropDownListSelected
                    selectedCount
                    isLoading={isLoading}
                    items={assistants.map(assistant => ({id: assistant.id, name: assistant.full_name}))}
                    selectedIdItems={permissionsIds}
                    onSelected={onSelected}
                />
            </section>
        </section>
    )
}
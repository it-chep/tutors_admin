import { FC, useEffect, useState } from "react";
import classes from './changeTgAdmins.module.scss'
import { assistantService, IAssistantData } from "../../../entities/assistant";
import { IItem } from "../../../shared/model/types";
import { useMyActions } from "../../../entities/my";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { DropDownListSelected } from "../../../shared/ui/dropDownSelected";
import { studentService } from "../../../entities/student";
import { AuthError } from "../../../shared/err/AuthError";
import { useGlobalLoadingActions } from "../../../entities/globalLoading";

interface IProps {
    assistant: IAssistantData;
    setAssistant: (assistant: IAssistantData) => void;
}

export const AssistantChangeTgAdmins: FC<IProps> = ({assistant, setAssistant}) => {

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [tgAdminsItems, setTgAdminsItems] = useState<IItem[]>([])
    const {setIsAuth} = useMyActions()
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsLoading: setIsLoadingGlobal} = useGlobalLoadingActions()

    const getData = async () => {
        try{
            setIsLoading(true)
            const tgItems = await studentService.getTgAdmins()
            setTgAdminsItems(tgItems)
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: 'Ошибка при получении списка tg-аккаунтов админов', type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    const updateTgAdmins = (tg_admins_usernames: {id: number, name: string}[]) => {
        setAssistant({...assistant, tg_admins_usernames} as IAssistantData)
    }

    const change = async (selected: boolean, item: IItem) => {
        const prevTgAdmins = assistant.tg_admins_usernames;
        try{
            setIsLoadingGlobal(true)
            if(selected){
                updateTgAdmins([...assistant.tg_admins_usernames, {id: item.id, name: item.name}])
                await assistantService.add_available_tg(assistant.id, item.id)
            }
            else{
                updateTgAdmins(assistant.tg_admins_usernames.filter(tg => tg.id !== item.id))
                await assistantService.delete_available_tg(assistant.id, item.id)
            }
        }
        catch(e){
            console.log(e)
            updateTgAdmins(prevTgAdmins)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: 'Ошибка при добавлении или удалении tg-аккаунта админа', type: 'error'})
            }
        }
        finally{
            setIsLoadingGlobal(false)
        }
    }

    const onSelected = (item: IItem) => {
        return (selected: boolean) => {
            change(selected, item)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <section className={classes.container}>
            <section className={classes.title}>
                Поменять доступные ТГ
            </section>
            <section className={classes.dropDown}>
                <DropDownListSelected
                    selectedCount
                    isLoading={isLoading}
                    items={tgAdminsItems}
                    selectedIdItems={
                        assistant.tg_admins_usernames.map(tg => tg.id)
                    }
                    onSelected={onSelected}
                />
            </section>
        </section>
    )
}
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
            const tgAdminsRes = await studentService.getTgAdmins()
            const tgItems = tgAdminsRes.map((a, ind) => ({id: Date.now() + ind, name: a}))
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

    const setTgAdmins = (tg_admins_usernames: string[]) => {
        setAssistant({...assistant, tg_admins_usernames} as IAssistantData)
    }

    const change = async (selected: boolean, item: IItem) => {
        const prevTgAdmins = assistant.tg_admins_usernames;
        try{
            setIsLoadingGlobal(true)
            if(selected){
                setTgAdmins([...assistant.tg_admins_usernames, item.name])
                await assistantService.add_available_tg(assistant.id, item.name)
            }
            else{
                const ind = assistant.tg_admins_usernames.findIndex(tg => tg === item.name)
                if(ind >= 0){
                    const copy = [...assistant.tg_admins_usernames]
                    copy.splice(ind, 1)
                    setTgAdmins(copy)
                }
                await assistantService.delete_available_tg(assistant.id, item.name)
            }
        }
        catch(e){
            console.log(e)
            setTgAdmins(prevTgAdmins)
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
                        tgAdminsItems.filter(tgItem => assistant.tg_admins_usernames.includes(tgItem.name)).map(tgItem => tgItem.id)
                    }
                    onSelected={onSelected}
                />
            </section>
        </section>
    )
}
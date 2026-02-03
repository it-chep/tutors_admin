import { FC, useEffect, useState } from "react";
import classes from './selectedTgAdmins.module.scss'
import { IItem } from "../../../../shared/model/types";
import { useMyActions } from "../../../../entities/my";
import { useGlobalMessageActions } from "../../../../entities/globalMessage";
import { studentService } from "../../../../entities/student";
import { AuthError } from "../../../../shared/err/AuthError";
import { DropDownListSelected } from "../../../../shared/ui/dropDownSelected";

interface IProps {
    setTgAdmins: (tgAdmins: string[]) => void;
    initTgAdmins?: string[]
}

export const SelectedTgAdmins: FC<IProps> = ({setTgAdmins, initTgAdmins}) => {
    
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [tgAdminsItems, setTgAdminsItems] = useState<IItem[]>([])
    const [selectedTgAdmins, setSelectedTgAdmins] = useState<number[]>([])
    const {setIsAuth} = useMyActions()
    const {setGlobalMessage} = useGlobalMessageActions()

    const getData = async () => {
        try{
            setIsLoading(true)
            const adminsRes = await studentService.getTgAdmins()
            const items = adminsRes.map((a, ind) => ({id: Date.now() + ind, name: a}))
            if(initTgAdmins){
                setSelectedTgAdmins(items.filter(admin => initTgAdmins.includes(admin.name)).map(admin => admin.id))
            }
            setTgAdminsItems(items)
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

    const onSelected = (item: IItem) => {
        return (selected: boolean) => {
            if(selected){
                setSelectedTgAdmins(a => [...a, item.id])
            }
            else{
                const ind = selectedTgAdmins.findIndex(a => a === item.id)
                if(ind >= 0){
                    const copy = [...selectedTgAdmins]
                    copy.splice(ind, 1)
                    setSelectedTgAdmins(copy)
                }
            }
        }
    }

    useEffect(() => {
        if(!isLoading){
            setTgAdmins(tgAdminsItems.filter(a => selectedTgAdmins.includes(a.id)).map(a => a.name))
        }
    }, [selectedTgAdmins, isLoading])
    
    useEffect(() => {
        getData()
    }, [])

    return (
        <section className={classes.dropDown}>
            <DropDownListSelected 
                selectedCount
                isLoading={isLoading}
                items={tgAdminsItems}
                selectedIdItems={selectedTgAdmins}
                onSelected={onSelected}
            />
        </section>
    )
}
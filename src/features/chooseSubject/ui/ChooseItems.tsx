import { FC, useEffect, useState } from "react";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { useMyActions } from "../../../entities/my";
import { AuthError } from "../../../shared/lib/helpers/AuthError";
import { ISubject } from "../../../entities/subject";
import { DropDownListSelected } from "../../../shared/ui/dropDownSelected";
import { IItem } from "../../../shared/model/types";
import classes from './chooseItems.module.scss'

interface IProps {
    title: string;
    selectedItems: number[];
    setItem: (id: number) => void;
    getData: () => Promise<IItem[]>;
    error?: string;
    setError?: (err: string) => void; 
}

export const ChooseItems: FC<IProps> = ({selectedItems, setItem, title, getData, error, setError}) => {

    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useMyActions()
    const [items, setItems] = useState<ISubject[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const getDataWrap = async () => {
        try{
            setIsLoading(true)
            const itemsRes = await getData()
            setItems(itemsRes)
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: `Ошибка при получении данных`, type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getDataWrap()
    }, [])

    const onSelected = (item: IItem) => {
        return (selected: boolean) => {
            setItem(selected ? item.id : -1) 
            setError && setError('')
        }
    }

    return (
        <section className={classes.container}>
            <section className={classes.title}>{title}</section>
            <DropDownListSelected 
                isLoading={isLoading}
                selectedIdItems={selectedItems}
                items={items}
                onSelected={onSelected}
            />
            <section className={classes.errorText}>
                {error}
            </section>
        </section>
    )
}
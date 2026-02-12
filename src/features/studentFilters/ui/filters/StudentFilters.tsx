import { FC, useEffect, useRef, useState } from "react";
import classes from './studentFilters.module.scss'
import { ToggleSwitch } from "../../../../shared/ui/toggleSwitch";
import { SelectedTgAdmins } from "../selectedTgAdmins/SelectedTgAdmins";
import { useSearchParams } from "react-router-dom";

interface IProps {
    onSelectedFilters: () => void;
}

export const StudentFilters: FC<IProps> = ({onSelectedFilters}) => {

    const [params, setParams] = useSearchParams()

    const [isLost, setIsLost] = useState<boolean>(!!params.get('is_lost'))
    const [tgAdmins, setTgAdmins] = useState<string[]>(params.getAll('tg_admins'))

    const onSetParams = () => {
        const newParams = new URLSearchParams(params)
        newParams.delete('tg_admins')
        if(tgAdmins.length > 0){
            for(let tg of tgAdmins){
                newParams.append('tg_admins', tg)
            }
        }
        if(isLost){
            newParams.set('is_lost', String(isLost))
        }
        else{   
            newParams.delete('is_lost')
        }
        return newParams
    }
    
    const isOne = useRef<boolean>(true)
    useEffect(() => {
        if(isOne.current){
            isOne.current = false;
        }
        else{
            setParams(onSetParams())
        }
    }, [tgAdmins, isLost])

    return (
        <section className={classes.container}>
            <section className={classes.tgAdmins}>
                <SelectedTgAdmins 
                    setTgAdmins={setTgAdmins}
                    initTgAdmins={params.getAll('tg_admins')}
                />
            </section>
            <section className={classes.toggle}>
                Должники: 
                <ToggleSwitch 
                    checked={isLost} 
                    onSelected={setIsLost} 
                />
            </section>
        </section>
    )
}
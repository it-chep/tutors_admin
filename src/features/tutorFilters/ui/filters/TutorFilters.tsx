import { FC, useEffect, useRef, useState } from "react";
import classes from './tutorFilters.module.scss'
import { SelectedTgAdmins } from "../../../studentFilters/ui/selectedTgAdmins/SelectedTgAdmins";
import { useSearchParams } from "react-router-dom";
import { ToggleSwitch } from "../../../../shared/ui/toggleSwitch";

export const TutorFilters: FC = () => {

    const [params, setParams] = useSearchParams()

    const [tgAdminIds, setTgAdminIds] = useState<number[]>(params.getAll('tg_admin_ids').map(id => parseInt(id, 10)).filter(id => !isNaN(id)))
    const [isFailer, setIsFailer] = useState<boolean>(!!params.get('is_failer'))

    const onSetParams = () => {
        const newParams = new URLSearchParams(params)
        newParams.delete('tg_admin_ids')
        if(tgAdminIds.length > 0){
            for(let id of tgAdminIds){
                newParams.append('tg_admin_ids', String(id))
            }
        }
        if(isFailer){
            newParams.set('is_failer', String(isFailer))
        }
        else{
            newParams.delete('is_failer')
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
    }, [tgAdminIds, isFailer])

    return (
        <section className={classes.container}>
            <section className={classes.sign}>Фильтры</section>
            <section className={classes.tgAdmins}>
                <span className={classes.label}>ТГ админы:</span>
                <SelectedTgAdmins
                    setTgAdmins={setTgAdminIds}
                    initTgAdmins={params.getAll('tg_admin_ids').map(id => parseInt(id, 10)).filter(id => !isNaN(id))}
                />
            </section>
            <section className={classes.toggle}>
                Без чека:
                <ToggleSwitch
                    checked={isFailer}
                    onSelected={setIsFailer}
                />
            </section>
        </section>
    )
}

import { FC, useEffect, useRef, useState } from "react";
import classes from './tutorFilters.module.scss'
import { SelectedTgAdmins } from "../../../studentFilters/ui/selectedTgAdmins/SelectedTgAdmins";
import { useSearchParams } from "react-router-dom";

export const TutorFilters: FC = () => {

    const [params, setParams] = useSearchParams()

    const [tgAdmins, setTgAdmins] = useState<string[]>(params.getAll('tg_admins'))

    const onSetParams = () => {
        const newParams = new URLSearchParams(params)
        newParams.delete('tg_admins')
        if(tgAdmins.length > 0){
            for(let tg of tgAdmins){
                newParams.append('tg_admins', tg)
            }
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
    }, [tgAdmins])

    return (
        <section className={classes.container}>
            <section className={classes.sign}>Фильтры</section>
            <section className={classes.tgAdmins}>
                <span className={classes.label}>ТГ админы:</span>
                <SelectedTgAdmins
                    setTgAdmins={setTgAdmins}
                    initTgAdmins={params.getAll('tg_admins')}
                />
            </section>
        </section>
    )
}

import { FC, useEffect, useRef, useState } from "react";
import classes from './tutorFilters.module.scss'
import { SelectedTgAdmins } from "../../../studentFilters/ui/selectedTgAdmins/SelectedTgAdmins";
import { useSearchParams } from "react-router-dom";

interface IProps {
    onSelectedFilters: () => void;
}

export const TutorFilters: FC<IProps> = ({onSelectedFilters}) => {

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
            <span>Фильтры</span>
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

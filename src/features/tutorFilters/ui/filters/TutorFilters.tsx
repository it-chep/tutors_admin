import { FC, useEffect, useRef, useState } from "react";
import classes from './tutorFilters.module.scss'
import { SelectedTgAdmins } from "../../../studentFilters/ui/selectedTgAdmins/SelectedTgAdmins";
import { useSearchParams } from "react-router-dom";

interface IProps {
    onSelectedFilters: () => void;
}

export const TutorFilters: FC<IProps> = ({onSelectedFilters}) => {

    const [params, setParams] = useSearchParams()

    const [tgAdminIds, setTgAdminIds] = useState<number[]>(params.getAll('tg_admin_ids').map(id => parseInt(id, 10)).filter(id => !isNaN(id)))

    const onSetParams = () => {
        const newParams = new URLSearchParams(params)
        newParams.delete('tg_admin_ids')
        if(tgAdminIds.length > 0){
            for(let id of tgAdminIds){
                newParams.append('tg_admin_ids', String(id))
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
    }, [tgAdminIds])

    return (
        <section className={classes.container}>
            <span>Фильтры</span>
            <section className={classes.tgAdmins}>
                <span className={classes.label}>ТГ админы:</span>
                <SelectedTgAdmins
                    setTgAdmins={setTgAdminIds}
                    initTgAdmins={params.getAll('tg_admin_ids').map(id => parseInt(id, 10)).filter(id => !isNaN(id))}
                />
            </section>
        </section>
    )
}

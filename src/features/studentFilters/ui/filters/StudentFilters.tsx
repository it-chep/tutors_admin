import { FC, useEffect, useState } from "react";
import classes from './studentFilters.module.scss'
import { ToggleSwitch } from "../../../../shared/ui/toggleSwitch";
import { SelectedTgAdmins } from "../selectedTgAdmins/SelectedTgAdmins";

interface IProps {
    onSelectedFilters: (tgAdmins: string[], isLost: boolean) => void;
}

export const StudentFilters: FC<IProps> = ({onSelectedFilters}) => {

    const [isLost, setIsLost] = useState<boolean>(false)
    const [tgAdmins, setTgAdmins] = useState<string[]>([])

    useEffect(() => {
        onSelectedFilters(tgAdmins, isLost)
    }, [tgAdmins, isLost])

    return (
        <section className={classes.container}>
            <SelectedTgAdmins 
                setTgAdmins={setTgAdmins}
            />
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
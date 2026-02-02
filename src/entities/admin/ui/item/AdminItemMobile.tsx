import { FC, PropsWithChildren } from "react";
import classes from './adminItem.module.scss'
import { IAdmin } from "../../model/types";
import { LabelText } from "../../../../shared/ui/sign";

interface IProps {
    admin: IAdmin;
}

export const AdminItemMobile: FC<IProps & PropsWithChildren> = ({admin, children}) => {

    return (
        <section className={classes.itemMobile}>
            <LabelText 
                label="ID"
                text={String(admin.id)}
            />
            <LabelText 
                label="ФИО"
                text={String(admin.full_name)}
            />
            <LabelText 
                label="Телеграм"
                text={
                    <a target="_blank" className={classes.link} href={admin.tg}>
                        Написать в ТГ
                    </a>
                }
            />
            <section className={classes.feature}>
                {children}
            </section>
        </section>
    )
}
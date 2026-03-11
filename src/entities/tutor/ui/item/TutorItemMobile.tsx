import { FC, PropsWithChildren } from "react";
import classes from './tutorItem.module.scss'
import { ITutor } from "../../model/types";
import { LabelText } from "../../../../shared/ui/sign";


interface IProps {
    tutor: ITutor;
    highlight: boolean;
}

export const TutorItemMobile: FC<IProps & PropsWithChildren> = ({tutor, highlight, children}) => {

    return (
        <section className={classes.itemMobile}>
            <section 
                className={
                    classes.highlight + (
                        highlight
                            ?
                        tutor.has_balance_negative ? ` ${classes.balanceNegative}` : 
                        tutor.has_only_trial ? ` ${classes.onlyTrial}` : 
                        tutor.has_newbie ? ` ${classes.newbie}` : ''
                            :
                        ` ${classes.nohighlight}`
                    )
                }
            />
            <LabelText 
                label="ID"
                text={String(tutor.id)}
            />
            <LabelText 
                label="Фио"
                text={tutor.full_name}
            />
            <LabelText 
                label="Телеграм"
                text={ 
                    <a target="_blank" className={classes.link} href={tutor.tg}>
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
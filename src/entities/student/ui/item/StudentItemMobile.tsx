import { FC, PropsWithChildren } from "react";
import classes from './studentItem.module.scss'
import { IStudent } from "../../model/types";
import { useAppSelector } from "../../../../app/store/store";
import { LabelText } from "../../../../shared/ui/sign";

interface IProps {
    student: IStudent;
    highlight?: boolean;
}

export const StudentItemMobile: FC<IProps & PropsWithChildren> = ({student, highlight, children}) => {

    const {my} = useAppSelector(s => s.myReducer)

    return (
        <section className={classes.itemMobile}>
            <section
                className={
                    classes.highlight + (
                        highlight
                            ?
                        student.is_balance_negative ? ` ${classes.balanceNegative}` : 
                        student.is_only_trial_finished ? ` ${classes.onlyTrial}` : 
                        student.is_newbie ? ` ${classes.newbie}` : ''
                            :
                        ` ${classes.nohighlight}`
                    )
                }
            />
            <LabelText 
                label="ID"
                text={String(student.id)}
            />
            <LabelText 
                label="ФИО"
                text={student.last_name + ' ' + student.first_name + ' ' + student.middle_name}
            />
            {
                my.role !== 'tutor'
                    &&
                <>
                    <LabelText 
                        label="Фио родителя"
                        text={student.parent_full_name}
                    />
                    <LabelText 
                        label="Телеграм"
                        text={
                            <a target="_blank" className={classes.link} href={student.tg}>
                                Написать в ТГ
                            </a>
                        }
                    />
                    <LabelText 
                        label="Баланс"
                        text={student.balance + '₽'}
                    />
                </>
            }            
            <section className={classes.feature}>
                {children}
            </section>
        </section>
    )
}
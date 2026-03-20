import { FC, PropsWithChildren } from "react";
import classes from './studentItem.module.scss'
import { IStudent } from "../../model/types";
import { useAppSelector } from "../../../../app/store/store";
import { LabelText } from "../../../../shared/ui/sign";
import { CommentsCount } from "./CommentsCount";

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
                    <LabelText 
                        label="Платежка"
                        text={student.payment_name}
                    />
                    {
                        my.paid_functions['student_comments'] && Boolean(student.comments_count)
                            &&
                        <LabelText 
                            label="Кол-во комментариев"
                            text={<CommentsCount count={student.comments_count} />}
                        />
                    }
                </>
            }            
            <section className={classes.feature}>
                {children}
            </section>
        </section>
    )
}
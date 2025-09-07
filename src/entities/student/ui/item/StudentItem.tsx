import { FC, PropsWithChildren } from "react";
import classes from './studentItem.module.scss'
import { IStudent } from "../../model/types";


interface IProps {
    student: IStudent;
}


export const StudentItem: FC<IProps & PropsWithChildren> = ({student, children}) => {

    return (
        <tr className={classes.item + (student.is_balance_negative ? ` ${classes.balanceNegative}` : student.is_only_trial_finished ? ` ${classes.onlyTrial}` : '')}>
            <td className={classes.id}>
                {student.id}
            </td>  
            <td className={classes.fio}>
                {student.last_name + ' ' + student.first_name + ' ' + student.middle_name}
            </td>
            <td className={classes.tg}>
                <a className={classes.link} href={student.tg}>
                    Написать в ТГ
                </a>
            </td>
            <td className={classes.feature}>
                {children}
            </td>
        </tr>
    )
}
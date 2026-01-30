import { FC, PropsWithChildren, ReactElement } from "react";
import classes from './card.module.scss'
import { DataList } from "../../../../shared/ui/dataList/DataList";
import { IStudentData } from "../../model/types";
import { Link } from "react-router-dom";

interface IProps {
    student: IStudentData;
    paymentChange: ReactElement;
    balanceChange: ReactElement;
}

export const StudentCard: FC<IProps & PropsWithChildren> = ({student, paymentChange, balanceChange}) => {


    return (
        <section className={classes.card}>
            <DataList
                title="Данные студента"
                list={[
                    `ID: ${student.id}`,
                    `ФИО: ${student.last_name} ${student.first_name} ${student.middle_name}`,
                    `Телефон: ${student.phone}`,
                    `Стоимость часа: ${student.cost_per_hour} ₽`,
                    <a
                        target="_blank"
                        href={student.tg}
                        className={classes.highlight}
                    >
                        Написать в тг
                    </a>,
                    `Предмет: ${student.subject_name}`,
                    <span>Репетитор: <Link to={'/tutor/' + student.tutor_id} className={classes.highlight}>{student.tutor_name}</Link></span>,
                    Boolean(student.tg_admin_username)
                        ?
                    `Рабочий аккаунт тг: ${student.tg_admin_username}`
                        :
                    <span className={classes.noTgID}>Нет рабочего аккаунта тг</span>
                ]}
            />
            <DataList
                title="Данные родителя"
                list={[
                    `ФИО: ${student.parent_full_name}`,
                    `Телефон: ${student.parent_phone}`,
                    <a
                        target="_blank"
                        href={student.parent_tg}
                        className={classes.highlight}
                    >
                        Написать в тг
                    </a>,
                    `Ссылка для прикрепления: https://t.me/Payments_A_bot?start=id_${student.id}`,
                    Boolean(student.tg_id)
                        ?
                    `TgID: ${student.tg_id}`
                        :
                    <span className={classes.noTgID}>Нет ТГ ID</span>
                ]}
            />
            <DataList
                title="Финансы"
                list={[
                    <section className={classes.financeItem}>Кошелек: ${student.balance} ₽ {balanceChange}</section>,
                    <section className={classes.financeItem}>Платежка: {student.payment_name} {paymentChange}</section>,
                ]}
            />
        </section>
    )
}
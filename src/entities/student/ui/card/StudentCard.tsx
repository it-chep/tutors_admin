import { FC } from "react";
import classes from './card.module.scss'
import { DataList } from "../../../../shared/ui/dataList/DataList";
import { IStudentData } from "../../model/types";
import { Link } from "react-router-dom";

interface IProps {
    student: IStudentData;
}

export const StudentCard: FC<IProps> = ({student}) => {

    
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
                    <span>Репетитор: <Link to={'/tutor/' + student.tutor_id} className={classes.highlight}>{student.tutor_name}</Link></span>
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
                    Boolean(student.tg_id) && `TgID: ${student.tg_id}`
                ]}
            />
            <DataList 
                title="Финансы"
                list={[
                    `Кошелек: ${student.balance} ₽`,
                ]}
            />
        </section>
    )
}
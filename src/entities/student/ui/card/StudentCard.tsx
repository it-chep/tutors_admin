import { FC } from "react";
import classes from './card.module.scss'
import { DataList } from "../../../../shared/ui/dataList/DataList";
import { IStudentData } from "../../model/types";

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
                    <span>Репетитор: <span className={classes.highlight}>{student.tutor_name}</span></span>
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
                    </a>
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
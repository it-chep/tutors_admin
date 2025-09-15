import { FC } from "react";
import { DeleteAction } from "../../../../features/deleteAction";
import { Message } from "../message/Message";
import classes from './header.module.scss'
import { useNavigate } from "react-router-dom";
import { STUDENTS_ROUTE } from "../../../../app/router/routes";
import { IStudentData, studentService } from "../../../../entities/student";

interface IProps {
    student: IStudentData;
}

export const Header: FC<IProps> = ({student}) => {

    const router = useNavigate()

    const onDelete = async () => {
        if(student.id){
            await studentService.delete(student.id)
            router(STUDENTS_ROUTE.path)
        }
    }

    return (
        <section className={classes.header}>
            <section className={classes.warnings}>
                {
                    student.is_balance_negative
                        &&
                    <Message 
                        type="balanceNegative"
                        sign="У родителя есть задолженность"
                    />
                }
                {
                    student.is_only_trial_finished
                        &&
                    <Message 
                        type="onlyTrial"
                        sign="Проведено только пробное занятие"
                    />
                }
                {
                    student.is_newbie
                        &&
                    <Message
                        type="newbie"
                        sign="Новичок"
                    />
                }
            </section>
            <DeleteAction
                successText="Студент удален"        
                errorText="Ошибка при удалении студента"
                onDelete={onDelete}
                questionText="Точно хотите удалить Студента ?"
            />
        </section>
    )
}
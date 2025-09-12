import { FC } from "react";
import { DeleteAction } from "../../../../features/deleteAction";
import { Message } from "../message/Message";
import classes from './header.module.scss'
import { useNavigate } from "react-router-dom";
import { STUDENTS_ROUTE } from "../../../../app/router/routes";
import { studentService } from "../../../../entities/student";

interface IProps {
    id: number;
}

export const Header: FC<IProps> = ({id}) => {

    const router = useNavigate()

    const onDelete = async () => {
        if(id){
            await studentService.delete(id)
            router(STUDENTS_ROUTE.path)
        }
    }

    return (
        <section className={classes.header}>
            <section className={classes.warnings}>
                <Message 
                    type="balanceNegative"
                    sign="У родителя есть задолженность"
                />
                <Message 
                    type="onlyTrial"
                    sign="Проведено только пробное занятие"
                />
                <Message
                    type="newbie"
                    sign="Новичок"
                />
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
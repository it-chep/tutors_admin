import { FC, useEffect, useState } from "react";
import { useMyActions } from "../../../../entities/my";
import { useGlobalMessageActions } from "../../../../entities/globalMessage";
import { IStudentData, StudentCard, studentService } from "../../../../entities/student";
import { useNavigate, useParams } from "react-router-dom";
import { AuthError } from "../../../../shared/lib/helpers/AuthError";
import classes from './studentWidget.module.scss'
import { Message } from "../message/Message";
import { StudentCalendar } from "../studentCalendar/StudentCalendar";
import { DeleteAction } from "../../../../features/deleteAction";
import { STUDENTS_ROUTE } from "../../../../app/router/routes";



export const StudentWidget: FC = () => {

    const [isLoaing, setIsLoading] = useState<boolean>(true)
    const [student, setStudent] = useState<IStudentData>()

    const {setIsAuth} = useMyActions()
    const {setGlobalMessage} = useGlobalMessageActions()

    const router = useNavigate()

    const {id} = useParams<{id: string}>()

    const getData = async () => {
        try{
            if(id){
                setIsLoading(true)
                const studentRes = await studentService.get(+id)
                setStudent(studentRes)
            }
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: 'Ошибка при получении данных о студенте', type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const onDelete = async () => {
        if(student){
            await studentService.delete(student.id)
            router(STUDENTS_ROUTE.path)
        }
    }

    return (
        <section className={classes.container}>   
            {
                isLoaing
                    ?
                <section></section>
                    :
                student
                    &&
                <>
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
                    <StudentCard
                        student={student}
                    />
                    <StudentCalendar id={student.id} />
                </>
            }
        </section>
    )
}
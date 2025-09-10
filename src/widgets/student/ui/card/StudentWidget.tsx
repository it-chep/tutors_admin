import { FC, useEffect, useState } from "react";
import { useMyActions } from "../../../../entities/my";
import { useGlobalMessageActions } from "../../../../entities/globalMessage";
import { IStudentData, StudentCard, studentService } from "../../../../entities/student";
import { useParams } from "react-router-dom";
import { AuthError } from "../../../../shared/lib/helpers/AuthError";
import classes from './studentWidget.module.scss'
import { Message } from "../message/Message";
import { StudentCalendar } from "../studentCalendar/StudentCalendar";



export const StudentWidget: FC = () => {

    const [isLoaing, setIsLoading] = useState<boolean>(true)
    const [student, setStudent] = useState<IStudentData>()

    const {setIsAuth} = useMyActions()
    const {setGlobalMessage} = useGlobalMessageActions()

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
                    <StudentCard
                        student={student}
                    />
                    <StudentCalendar id={student.id} />
                </>
            }
        </section>
    )
}
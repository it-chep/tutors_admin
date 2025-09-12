import { FC, useEffect, useState } from "react";
import { useMyActions } from "../../../../entities/my";
import { useGlobalMessageActions } from "../../../../entities/globalMessage";
import { IStudentData, StudentCard, studentService } from "../../../../entities/student";
import { useParams } from "react-router-dom";
import { AuthError } from "../../../../shared/lib/helpers/AuthError";
import classes from './studentWidget.module.scss'
import { StudentCalendar } from "../studentCalendar/StudentCalendar";
import { useAppSelector } from "../../../../app/store/store";
import { Header } from "../header/Header";
import { DataList } from "../../../../shared/ui/dataList";
import { TutorFeatures } from "../tutorFeatures/TutorFeatures";

export const StudentWidget: FC = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [student, setStudent] = useState<IStudentData>()

    const {setIsAuth} = useMyActions()
    const {setGlobalMessage} = useGlobalMessageActions()

    const {my} = useAppSelector(s => s.myReducer)

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
                isLoading
                    ?
                <section></section>
                    :
                student
                    &&
                (
                    my.role !== 'tutor'
                        ?
                    <>
                        <Header id={student.id} />
                        <StudentCard
                            student={student}
                        />
                        <StudentCalendar id={student.id} />
                    </>
                        :
                    <section className={classes.tutor}>
                        <DataList 
                            title="Данные студента"
                            list={[
                                `ID: ${student.id}`,
                                `ФИО: ${student.last_name} ${student.first_name} ${student.middle_name}`,
                                `Предмет: ${student.subject_name}`,
                            ]}
                        />
                        <TutorFeatures 
                            newbie={student.is_newbie}
                            id={student.id} 
                            student={student}
                            setStudent={setStudent}
                        />
                    </section>
                )
            }
        </section>
    )
}
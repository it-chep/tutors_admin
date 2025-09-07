import { FC, useEffect, useState } from "react";
import classes from './studentsWidget.module.scss'
import { IStudent, studentService } from "../../../entities/student";
import { MyButton } from "../../../shared/ui/button";
import { Table } from "../../../shared/ui/table";
import { LoaderSpinner } from "../../../shared/ui/spinner";
import { AuthError } from "../../../shared/lib/helpers/AuthError";
import { useMyActions } from "../../../entities/my";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { useNavigate } from "react-router-dom";
import { STUDENT_CREATE_ROUTE } from "../../../app/router/routes";


export const StudentsWidget: FC = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true)

    const [students, setStudents] = useState<IStudent[]>([])

    const router = useNavigate()

    const {setIsAuth} = useMyActions()
    const {setGlobalMessage} = useGlobalMessageActions()

    const getData = async () => {
        try{
            setIsLoading(true)
            const studentsRes = await studentService.getAll()
            setStudents(studentsRes)
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: 'Ошибка при получении списка студентов', type: 'error'})
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
            <section className={classes.addStudent}>
                <MyButton onClick={() => router(STUDENT_CREATE_ROUTE.path)}>
                    Добавить Студента
                </MyButton>
            </section>
            {
                isLoading
                    ?
                <section className="loader"><LoaderSpinner /></section>
                    :
                <Table 
                    titles={['ID', 'Фио', 'Телеграм']}
                    rows={
                        students.map(
                            student => (
                                [
                                    String(student.id), 
                                    student.last_name + ' ' + student.first_name + ' ' + student.middle_name, 
                                    student.tg,
                                    <MyButton>Подробнее</MyButton>
                                ]
                            )
                        )
                    }
                />
            }
        </section>
    )
}
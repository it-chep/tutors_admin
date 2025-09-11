import { FC, useEffect, useState } from "react";
import classes from './studentsWidget.module.scss'
import { IStudent, StudentItem, studentService } from "../../../entities/student";
import { MyButton } from "../../../shared/ui/button";
import { LoaderSpinner } from "../../../shared/ui/spinner";
import { AuthError } from "../../../shared/lib/helpers/AuthError";
import { useMyActions } from "../../../entities/my";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { useNavigate } from "react-router-dom";
import { STUDENT_CREATE_ROUTE } from "../../../app/router/routes";
import { SearchItems } from "../../../features/searchItems/ui/SearchItems";

interface IProps {
    request: () => Promise<IStudent[]>
    add: boolean;
}

export const StudentsWidget: FC<IProps> = ({request, add}) => {

    const [isLoading, setIsLoading] = useState<boolean>(true)

    const [students, setStudents] = useState<IStudent[]>([])
    const [studentsSearch, setStudentsSearch] = useState<IStudent[]>([])

    const router = useNavigate()

    const {setIsAuth} = useMyActions()
    const {setGlobalMessage} = useGlobalMessageActions()

    const getData = async () => {
        try{
            setIsLoading(true)
            const studentsRes = await request()
            setStudents(studentsRes)
            setStudentsSearch(studentsRes)
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
            {
                add 
                    &&
                <section className={classes.addStudentWrap}>
                    <section className={classes.button}> 
                        <MyButton onClick={() => router(STUDENT_CREATE_ROUTE.path)}>
                            Добавить студента
                        </MyButton>
                    </section>
                </section>

            }
            <section className={classes.searchItems}>
                <SearchItems 
                    placeholder="Введите фио студента"
                    items={students.map(
                        student => ({...student, name: student.last_name + ' ' + student.first_name + ' ' + student.middle_name,})
                    )}
                    setItems={setStudentsSearch}
                />
            </section>
            {
                isLoading
                    ?
                <section className="loader"><LoaderSpinner /></section>
                    :
                <table className={classes.table}>
                    <thead>
                        <tr className={classes.item}>
                            <th>ID</th>
                            <th>Фио</th>
                            <th>Телеграм</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentsSearch.map(student => 
                            <StudentItem 
                                key={student.id}
                                student={student}
                            >
                                <MyButton onClick={() => router('/student/' + student.id)}>
                                    Подробнее
                                </MyButton>
                            </StudentItem>
                        )}
                    </tbody>
                </table>
            }
        </section>
    )
}
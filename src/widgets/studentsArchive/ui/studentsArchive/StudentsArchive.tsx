import { FC, useEffect, useRef, useState } from "react";
import classes from './studentsArchive.module.scss'
import { IStudent, studentService } from "../../../../entities/student";
import { LoaderSpinner } from "../../../../shared/ui/spinner";
import { AuthError } from "../../../../shared/lib/helpers/AuthError";
import { useMyActions } from "../../../../entities/my";
import { useGlobalMessageActions } from "../../../../entities/globalMessage";
import { Link, useNavigate } from "react-router-dom";
import { SearchItems } from "../../../../features/searchItems";
import { StudentFilters } from "../../../../features/studentFilters";
import { STUDENTS_ROUTE } from "../../../../app/router/routes";
import { Table } from "../table/Table";
import { Items } from "../items/Items";

export const StudentsArchive: FC = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [students, setStudents] = useState<IStudent[]>([])
    const [studentsCount, setStudentsCount] = useState<number>(0)
    const [studentsSearch, setStudentsSearch] = useState<IStudent[]>([])

    const router = useNavigate()

    const {setIsAuth} = useMyActions()
    const {setGlobalMessage} = useGlobalMessageActions()

    const getData = async (req: () => Promise<{students: IStudent[], students_count: number}>) => {
        try{
            setIsLoading(true)
            const studentsRes = await req()
            setStudentsCount(studentsRes.students_count)
            setStudents(studentsRes.students)
            setStudentsSearch(studentsRes.students)
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

    const isOne = useRef<boolean>(true)
    const onSelectedFilters = (tgAdmins: string[], isLost: boolean) => {
        if(isOne.current){
            isOne.current = false
            return
        }
        if(tgAdmins.length || isLost){
            getData(() => studentService.getAllByFilters(tgAdmins, isLost, true))
        }
        else{
            getData(studentService.getArchiveAll)
        }
    }

    useEffect(() => {
        getData(studentService.getArchiveAll)
    }, [])

    return (
        <section className={classes.container}>
            <section className={classes.header}>
                <section className={classes.filter}>
                    <StudentFilters onSelectedFilters={onSelectedFilters} />
                </section>
                <Link to={STUDENTS_ROUTE.path}>
                    К активным студентам
                </Link>
            </section>
            <section className={classes.search}>
                <section className={classes.searchItems}>
                    <SearchItems
                        placeholder="Введите фио студента или родителя"
                        items={students.map(
                            student => ({
                                ...student, 
                                name: student.last_name + ' ' + student.first_name + ' ' + student.middle_name + ' ' + student.parent_full_name
                            })
                        )}
                        setItems={setStudentsSearch}
                    />
                </section>
                {
                    !isLoading
                        &&
                    <section className={classes.studentsCount}>
                        Кол-во студентов: {studentsCount}
                    </section>
                }
            </section>
            {
                isLoading
                    ?
                <section className="loader"><LoaderSpinner /></section>
                    :
                <>
                    <Table 
                        studentsSearch={studentsSearch}
                    />
                    <Items 
                        studentsSearch={studentsSearch}
                    />
                </>
            }
        </section>
    )
}
import { FC, useEffect, useState } from "react";
import classes from './studentsWidget.module.scss'
import { IStudent, studentService } from "../../../../entities/student";
import { MyButton } from "../../../../shared/ui/button";
import { LoaderSpinner } from "../../../../shared/ui/spinner";
import { AuthError } from "../../../../shared/lib/helpers/AuthError";
import { useMyActions } from "../../../../entities/my";
import { useGlobalMessageActions } from "../../../../entities/globalMessage";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { STUDENT_CREATE_ROUTE, STUDENTS_ARCHIVE_ROUTE } from "../../../../app/router/routes";
import { useAppSelector } from "../../../../app/store/store";
import { HintWrap } from "../hint/Hint";
import { SearchItems } from "../../../../features/searchItems";
import { StudentFilters } from "../../../../features/studentFilters";
import { NotificationPushAllStudents } from "../../../../features/notificationPushAllStudents";
import { Items } from "../items/Items";
import { Table } from "../table/Table";

interface IProps {
    request: () => Promise<{students: IStudent[], students_count: number}>
    add: boolean;
    highlight?: boolean;
}

export const StudentsWidget: FC<IProps> = ({request, add, highlight=true}) => {

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [students, setStudents] = useState<IStudent[]>([])
    const [studentsCount, setStudentsCount] = useState<number>(0)
    const [studentsSearch, setStudentsSearch] = useState<IStudent[]>([])

    const [params, setParams] = useSearchParams()

    const router = useNavigate()

    const {setIsAuth} = useMyActions()
    const {setGlobalMessage} = useGlobalMessageActions()

    const {my} = useAppSelector(s => s.myReducer)

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

    const onSelectedFilters = () => {
        const isLost = !!params.get('is_lost');
        const tgAdmins = params.getAll('tg_admins')
        if(tgAdmins.length || isLost){
            getData(() => studentService.getAllByFilters(tgAdmins, isLost))
        }
        else{
            getData(request)
        }
    }

    useEffect(() => {
        onSelectedFilters()
    }, [params])

    return (
        <section className={classes.container}>
            {
                (add || highlight)
                    &&
                <section className={classes.header}>
                    {
                        (my.role === 'admin' || my.role === 'assistant')
                            &&
                        <section className={classes.filter}>
                            <StudentFilters onSelectedFilters={onSelectedFilters} />
                        </section>
                    }
                    <section className={classes.right}>
                        <section className={classes.features}>
                            {
                                highlight
                                    &&
                                <HintWrap />
                            }
                            {
                                (my.role === 'admin' || my.role === 'assistant') && my.paid_functions['student_archive']
                                    &&
                                add
                                    &&
                                <Link to={STUDENTS_ARCHIVE_ROUTE.path}>
                                    К архиву
                                </Link>
                            }
                            {
                                (my.role === 'admin' || my.role === 'assistant')
                                    &&
                                add
                                    &&
                                <section className={classes.notification}>
                                    <NotificationPushAllStudents />
                                </section>
                            }
                        </section>
                        {
                            add 
                                &&
                            <section className={classes.add}> 
                                <MyButton onClick={() => router(STUDENT_CREATE_ROUTE.path)}>
                                    Добавить студента
                                </MyButton>
                            </section>
                        }
                    </section>
                </section>
            }
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
                    <section className={classes.count}>
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
                        highlight={highlight}
                    />
                    <Items  
                        studentsSearch={studentsSearch}
                        highlight={highlight}
                    />
                </>
            }   
        </section>
    )
}
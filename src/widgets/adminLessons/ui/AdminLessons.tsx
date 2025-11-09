import { FC, useCallback, useState } from "react";
import classes from './adminLessons.module.scss'
import { AdminLessonItem, adminService, IAdminLesson } from "../../../entities/admin";
import { AuthError } from "../../../shared/err/AuthError";
import { useMyActions } from "../../../entities/my";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { LoaderSpinner } from "../../../shared/ui/spinner";
import { Calendar } from "../../../features/calendar";
import { getDateUTC } from "../../../shared/lib/helpers/getDateUTC";


export const AdminLessons: FC = () => {

    const [lessons, setLessons] = useState<IAdminLesson[] | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false) 
    const {setIsAuth} = useMyActions()
    const {setGlobalMessage} = useGlobalMessageActions()
    const [count, setCount] = useState<number>(0)   

    const getData = async (from: string, to: string) => {
        try{
            setIsLoading(true)
            const lessonsRes = await adminService.getLessons(from, to)
            setLessons(lessonsRes.lessons)
            setCount(lessonsRes.lessons_count)
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: 'Ошибка при получении списка занятий', type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }
    
    const setDate = useCallback((startDate: Date | null, endDate: Date | null) => {
        if(startDate && endDate){
            getData(getDateUTC(startDate), getDateUTC(endDate))
        }
    }, [])
    
    return (
        <section className={classes.container}>
            <Calendar onDateRangeSelect={setDate} />
            {
                isLoading
                    ?
                <section className={classes.loader}><LoaderSpinner /></section>
                    :
                lessons
                    &&
                <>
                {
                    !isLoading  
                        &&
                    <section className={classes.count}>Кол-во занятий: {count}</section>
                }
                {
                    lessons.length
                        ?
                    <table className={classes.table}>
                        <thead>
                            <tr className={classes.item}>
                                <th>Дата</th>
                                <th>ФИО репетитора</th>
                                <th>ФИО студента</th>
                                <th>Длительность</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lessons.map(lesson => 
                                <AdminLessonItem 
                                    key={lesson.id} 
                                    lesson={lesson} 
                                />
                            )}
                        </tbody>
                    </table>
                        :
                    <></>
                }
                </>
            }
        </section>
    )
}
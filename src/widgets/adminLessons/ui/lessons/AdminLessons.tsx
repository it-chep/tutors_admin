import { FC, useCallback, useState } from "react";
import classes from './adminLessons.module.scss'
import { adminService, IAdminLesson } from "../../../../entities/admin";
import { AuthError } from "../../../../shared/err/AuthError";
import { useMyActions } from "../../../../entities/my";
import { useGlobalMessageActions } from "../../../../entities/globalMessage";
import { LoaderSpinner } from "../../../../shared/ui/spinner";
import { Calendar } from "../../../../features/calendar";
import { getDateUTC } from "../../../../shared/lib/helpers/getDateUTC";
import { studentService } from "../../../../entities/student";
import { Table } from "../table/Table";
import { Items } from "../items/Items";

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

    const setData = (ind: number) => {
        return (date: string, duration_in_minutes: number) => {
            setLessons(prev => prev ? prev.map((l, index) => index === ind ? {...l, date, duration_in_minutes} : l): prev)
        }
    }

    const onDelete = async (ind: number, lessonId: number) => {
        await studentService.deleteLesson(lessonId)
        setLessons(prev => prev ? prev.filter((l, i) => i !== ind) : prev)
    }
    
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
                    <section className={classes.count}>Кол-во занятий: {count}</section>
                {
                    lessons.length
                        ?
                    <>
                        <Table 
                            lessons={lessons}
                            setData={setData}
                            onDelete={onDelete}
                        />
                        <Items 
                            lessons={lessons}
                            setData={setData}
                            onDelete={onDelete}
                        />
                    </>
                        :
                    <></>
                }
                </>
            }
        </section>
    )
}
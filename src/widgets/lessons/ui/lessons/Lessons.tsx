import { FC, useState, useCallback } from "react";
import classes from './lessons.module.scss'
import { ILesson, studentService } from "../../../../entities/student";
import { useGlobalMessageActions } from "../../../../entities/globalMessage";
import { useMyActions } from "../../../../entities/my";
import { AuthError } from "../../../../shared/err/AuthError";
import { Calendar } from "../../../../features/calendar";
import { LoaderSpinner } from "../../../../shared/ui/spinner";
import { getDateUTC } from "../../../../shared/lib/helpers/getDateUTC";
import { OpenContainer } from "../../../../features/openContainer";
import { Table } from "../table/Table";
import { Items } from "../items/Items";

interface IProps {
    studentId: number;
}

export const Lessons: FC<IProps> = ({studentId}) => {

    const [lessons, setLessons] = useState<ILesson[] | null>(null) 
    const [count, setCount] = useState<number>(0)   
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const {setGlobalMessage} = useGlobalMessageActions()    
    const {setIsAuth} = useMyActions()
            
    const setDate = useCallback((startDate: Date | null, endDate: Date | null) => {
        if(startDate && endDate){
            getLessons(getDateUTC(startDate), getDateUTC(endDate))
        }
    }, [])

    const setData = (ind: number) => {
        return (date: string, duration_minutes: number) => {
            setLessons(prev => prev ? prev.map((l, index) => index === ind ? {...l, date, duration_minutes} : l): prev)
        }
    }

    const onDelete = async (ind: number, lessonId: number) => {
        await studentService.deleteLesson(lessonId)
        setLessons(prev => prev ? prev.filter((l, i) => i !== ind) : prev)
    }

    const getLessons = async (from: string, to: string) => {
        try{
            setIsLoading(true)
            const lessonsRes = await studentService.getLessons(studentId, from, to)
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
                setGlobalMessage({message: 'Ошибка при получении занятий студента', type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    return (
        <section className={classes.container}>
            <OpenContainer title="Занятия">
                <section className={classes.content}>
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
                            lessons?.length
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
            </OpenContainer>
        </section>
    )
}
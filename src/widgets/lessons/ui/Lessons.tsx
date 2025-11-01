import { FC, useEffect, useState, useCallback } from "react";
import classes from './lessons.module.scss'
import { ILesson, LessonItem, studentService } from "../../../entities/student";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { useMyActions } from "../../../entities/my";
import { AuthError } from "../../../shared/err/AuthError";
import { Calendar } from "../../../features/calendar";
import { LoaderSpinner } from "../../../shared/ui/spinner";
import { tutorService } from "../../../entities/tutor";
import { DeleteAction } from "../../../features/deleteAction";
import { ChangeDurationLesson } from "../../../features/changeDurationLesson";

interface IProps {
    studentId?: number;
    tutorId?: number;
    showFio?: boolean;
}

export const Lessons: FC<IProps> = ({studentId, tutorId, showFio=false}) => {

    const [lessons, setLessons] = useState<ILesson[]>([])    
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const {setGlobalMessage} = useGlobalMessageActions()    
    const {setIsAuth} = useMyActions()

    const setDate = useCallback((startDate: Date | null, endDate: Date | null) => {
        if(startDate && endDate){
            getLessons(startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0])
        }
    }, [])

    const setData = (ind: number) => {
        return (date: string, duration_minutes: number) => {
            setLessons(prev => prev.map((l, index) => index === ind ? {...l, date, duration_minutes} : l))
        }
    }

    const onDelete = async (ind: number, lessonId: number) => {
        await studentService.deleteLesson(lessonId)
        setLessons(prev => prev.filter((l, i) => i !== ind))
    }

    const getLessons = async (from: string, to: string) => {
        try{
            setIsLoading(true)
            if(studentId){
                const lessonsRes = await studentService.getLessons(studentId, from, to)
                setLessons(lessonsRes)
            }
            else if(tutorId){
                const lessonsRes = await tutorService.getLessons(tutorId, from, to)
                setLessons(lessonsRes)
            }
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

    useEffect(() => {
        const dateNow = new Date()
        setDate(dateNow, dateNow)
    }, [setDate])

    return (
        <section className={classes.container}>
            <section className={classes.title}>Занятия</section>
            <Calendar onDateRangeSelect={setDate} />
            {
                isLoading
                    ?
                <section className={classes.loader}><LoaderSpinner /></section>
                    :
                lessons.length
                    &&
                <table className={classes.table}>
                    <thead>
                        <tr className={classes.item}>
                            <th>Дата</th>
                            {
                                showFio
                                    &&
                                <th>Фио</th>
                            }
                            <th>Длительность</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {lessons.map((lesson, ind) => 
                            <LessonItem key={lesson.id} showFio={showFio} lesson={lesson}>
                                <section className={classes.features}>
                                    <ChangeDurationLesson 
                                        lessonId={lesson.id}
                                        durationInit={`${lesson.duration_minutes}`} 
                                        dateInit={lesson.date}
                                        setData={setData(ind)}
                                    />
                                    <DeleteAction 
                                        questionText="Вы точно хотите удалить занятие ?"
                                        successText="Занятие успешно удалено"
                                        errorText="Ошибка при удалении занятия"
                                        onDelete={() => onDelete(ind, lesson.id)}
                                    />
                                </section>
                            </LessonItem>
                        )}
                    </tbody>
                </table>
            }
        </section>
    )
}
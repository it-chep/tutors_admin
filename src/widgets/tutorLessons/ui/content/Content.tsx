import { FC, useState } from "react";
import { Calendar } from "../../../../features/calendar";
import { ILesson } from "../../../../entities/student";
import { useGlobalMessageActions } from "../../../../entities/globalMessage";
import { useMyActions } from "../../../../entities/my";
import { useAppSelector } from "../../../../app/store/store";
import { tutorService } from "../../../../entities/tutor";
import { AuthError } from "../../../../shared/err/AuthError";
import { useSetDate } from "../../lib/helpers/useSetDate";
import { getSetData } from "../../lib/helpers/getSetData";
import { getOnDelete } from "../../lib/helpers/getOnDelete";
import { Table } from "../table/Table";
import classes from './content.module.scss'
import { LoaderSpinner } from "../../../../shared/ui/spinner";
import { Items } from "../items/Items";

interface IProps {
    tutorId?: number;
}

export const Content: FC<IProps> = ({tutorId}) => {

    const [lessons, setLessons] = useState<ILesson[] | null>(null) 
    const [count, setCount] = useState<number>(0)   
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const {setGlobalMessage} = useGlobalMessageActions()    
    const {setIsAuth} = useMyActions()
    const {my} = useAppSelector(s => s.myReducer)

    const getLessons = async (from: string, to: string) => {
        try{
            setIsLoading(true)
            const lessonsRes = await tutorService.getLessons(tutorId || my.id, from, to)
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
                setGlobalMessage({message: 'Ошибка при получении занятий репетитора', type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    const setDate = useSetDate(getLessons)
    const setData = getSetData(setLessons)
    const onDelete = getOnDelete(setLessons)

    return (
    <>
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
    </>
    )
}
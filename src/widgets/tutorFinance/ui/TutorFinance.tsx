import { FC, useState } from "react";
import classes from './tutorFinance.module.scss'
import { ITutorFinance, tutorService } from "../../../entities/tutor";
import { useAppSelector } from "../../../app/store/store";
import { useMyActions } from "../../../entities/my";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { AuthError } from "../../../shared/err/AuthError";
import { getDateUTC } from "../../../shared/lib/helpers/getDateUTC";
import { Calendar } from "../../../shared/ui/calendar";
import { LoaderSpinner } from "../../../shared/ui/spinner";


interface IProps {
    id: number;
}

export const TutorFinance: FC<IProps> = ({id}) => {

    const [finance, setFinance] = useState<ITutorFinance | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const {my} = useAppSelector(s => s.myReducer)
    const {setIsAuth} = useMyActions()
    const {setGlobalMessage} = useGlobalMessageActions()

    const getData = async (startDate: string, endDate: string) => {
        try{
            setIsLoading(true)
            const financeRes = await tutorService.getFinance(id, startDate, endDate)
            setFinance(financeRes)
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: 'Ошибка при получении финансов репетитора', type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    const setDate = (startDate: Date | null, endDate: Date | null) => {
        if(startDate && endDate){
            getData(getDateUTC(startDate), getDateUTC(endDate))
        }
        if(!startDate && !endDate){
            setFinance(null)
        }
    }

    return (
        <section className={classes.container}>
            <Calendar
                onDateRangeSelect={setDate} 
                isLoading={isLoading}
            />
            {
                isLoading
                    ?
                <section className={classes.loader}><LoaderSpinner /></section>
                    :
                finance
                    &&
                <section className={classes.data}>
                    <section className={classes.sub}>Репетитор</section>
                    <span>Количество часов : {finance.hours_count}</span>
                    <span>Заработная плата: {finance.wages} ₽</span>
                    {
                        (my.role === 'admin' || my.role === 'super_admin' || my.role === 'tutor')
                            &&
                        <>
                            <section className={classes.sub}>Общее</section>
                            <span>Прибыль: {finance.amount} ₽</span>
                        </>
                    }
                </section>
            }
        </section>
    )
}
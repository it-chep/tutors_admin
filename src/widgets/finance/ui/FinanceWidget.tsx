import { FC, useState } from "react";
import classes from './financeWidget.module.scss'
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { IMyFinance, myService, useMyActions } from "../../../entities/my";
import { AuthError } from "../../../shared/lib/helpers/AuthError";
import { LoaderSpinner } from "../../../shared/ui/spinner";
import { Calendar } from "../../../features/calendar";


export const FinanceWidget: FC = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const {setIsAuth} = useMyActions()
    const {setGlobalMessage} = useGlobalMessageActions()
    const [finance, setFinance] = useState<IMyFinance | null>()
    
    const getData = async (startDate: string, endDate: string) => {
        try{
            setIsLoading(true)
            const financeRes = await myService.getFinance(startDate, endDate)
            setFinance(financeRes)
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: 'Ошибка при получении данных о финансах', type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }
    
    const setDate = (startDate: Date | null, endDate: Date | null) => {
        if(startDate && endDate){
            getData(startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0])
        }
        if(!startDate && !endDate){
            setFinance(null)
        }
    }

    return (
        <section className={classes.container}>
            <Calendar onDateRangeSelect={setDate} />
            {
                isLoading
                    ?
                <section className={classes.loader}><LoaderSpinner /></section>
                    :
                finance
                    &&
                <section className={classes.data}>
                    <section className={classes.section}> 
                        <section className={classes.subtitle}>Общее</section>
                        <span>Прибыль: {finance.profit} ₽</span>
                        <span>Валовая прибыль (выручка): {finance.cash_flow} ₽</span>
                    </section>
                     <section className={classes.section}> 
                        <section className={classes.subtitle}>Репетиторы</section>
                        <span>Количество оплаченных занятий : {finance.base_lessons}</span>
                        <span>Количество пробных занятий: {finance.trial_lessons}</span>
                        <span>Общее количество занятий: {finance.lessons_count}</span>
                        <span>Конверсия: {finance.conversion} %</span>
                    </section>
                </section>
            }
        </section>
    )
}
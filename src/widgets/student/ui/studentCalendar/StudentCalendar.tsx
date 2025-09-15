import { FC, useState } from "react";
import { Calendar } from "../../../../features/calendar";
import classes from './studentCalendar.module.scss'
import { IStudentFinance, studentService } from "../../../../entities/student";
import { LoaderSpinner } from "../../../../shared/ui/spinner";
import { useMyActions } from "../../../../entities/my";
import { useGlobalMessageActions } from "../../../../entities/globalMessage";
import { AuthError } from "../../../../shared/lib/helpers/AuthError";

interface IProps {
    id: number;
}

export const StudentCalendar: FC<IProps> = ({id}) => {

    const [finance, setFinance] = useState<IStudentFinance | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const {setIsAuth} = useMyActions()
    const {setGlobalMessage} = useGlobalMessageActions()

    const getData = async (startDate: string, endDate: string) => {
        try{
            setIsLoading(true)
            const financeRes = await studentService.getFinance(id, startDate, endDate)
            setFinance(financeRes)
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: 'Ошибка при получении финансов студента', type: 'error'})
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
            <section className={classes.title}>Финансы</section>
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
                    <span>Количество занятий: {finance?.count}</span>
                    <span>Прибыль: {finance?.amount} ₽</span>
                    <span></span>
                </section>
            }
        </section>
    )
}
import { FC, useEffect, useState } from "react";
import classes from './financeWidget.module.scss'
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { useMyActions } from "../../../entities/my";
import { AuthError } from "../../../shared/lib/helpers/AuthError";
import { Calendar } from "../../../features/calendar";
import { useAppSelector } from "../../../app/store/store";
import { useGlobalLoadingActions } from "../../../entities/globalLoading";
import { adminService, IAdminFinance, IAdminFinanceByTgAdmins } from "../../../entities/admin";
import { getDateUTC } from "../../../shared/lib/helpers/getDateUTC";
import { SelectedTgAdmins } from "../../../features/studentFilters";


export const FinanceWidget: FC = () => {

    const {my} = useAppSelector(s => s.myReducer)
    const {setIsAuth} = useMyActions()
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsLoading} = useGlobalLoadingActions()
    const [finance, setFinance] = useState<IAdminFinanceByTgAdmins | null>(null)
    const [tgAdmins, setTgAdmins] = useState<string[]>([])
    
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    
    const getData = async (startDate: string, endDate: string) => {
        try{
            setIsLoading(true)
            if(tgAdmins.length){
                const financeRes = await adminService.getFinanceByTgAdmins(startDate, endDate, my.id, tgAdmins)
                setFinance(financeRes)
            }
            else{
                const financeRes = await adminService.getFinance(startDate, endDate, my.id)
                setFinance(financeRes)
            }
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
        setStartDate(startDate)
        setEndDate(endDate)
        if(startDate && endDate){
            getData(getDateUTC(startDate), getDateUTC(endDate))
        }
        if(!startDate && !endDate){
            setFinance(null)
        }
    }

    useEffect(() => {
        if(startDate && endDate && my.paid_functions.get('finance_by_tgs')){
            getData(getDateUTC(startDate), getDateUTC(endDate))
        }
    }, [tgAdmins])

    return (
        <section className={classes.container}>
            <section className={classes.calendar}>
                <Calendar onDateRangeSelect={setDate}/> 
                {
                    finance
                        &&
                    <section className={classes.data}>
                        <section className={classes.section}> 
                            <section className={classes.subtitle}>Общее</section>
                            <span>Прибыль: {finance.profit} ₽</span>
                            <span>Валовая прибыль (выручка): {finance.cash_flow} ₽</span>
                            <span>Дебиторская задолженность: {finance.debt} ₽</span>
                        </section>
                        <section className={classes.section}> 
                            <section className={classes.subtitle}>Репетиторы</section>
                            <span>Общая зарплата: {finance.salary} ₽</span>
                            <span>Общее количество часов: {finance.hours}</span>
                        </section>
                    </section>
                }
            </section>
            {
                my.paid_functions.get('finance_by_tgs')
                    &&
                <section className={classes.selectedTgAdmins}>
                    <SelectedTgAdmins 
                        setTgAdmins={setTgAdmins}
                    />
                </section>
            }
        </section>
    )
}
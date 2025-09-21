import { FC, useEffect, useRef, useState } from "react";
import classes from './financeWidget.module.scss'
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { IMyFinance, myService, useMyActions } from "../../../entities/my";
import { AuthError } from "../../../shared/lib/helpers/AuthError";
import { Calendar } from "../../../features/calendar";
import { useAppSelector } from "../../../app/store/store";
import { ChooseItems } from "../../../features/chooseSubject";
import { adminService } from "../../../entities/admin";
import { useGlobalLoadingActions } from "../../../entities/globalLoading";


export const FinanceWidget: FC = () => {

    const {my} = useAppSelector(s => s.myReducer)
    const {setIsAuth} = useMyActions()
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsLoading} = useGlobalLoadingActions()
    const [finance, setFinance] = useState<IMyFinance | null>(null)
    const [selectedAdmin, setSelectedAdmin] = useState<number | null>(my.role === 'admin' ? my.id : null)
    
    const getData = async (startDate: string, endDate: string) => {
        try{
            setIsLoading(true)
            const financeRes = await myService.getFinance(startDate, endDate, selectedAdmin || -1)
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

    const getAdmins = async() => {
        const admins = await adminService.getAll()
        return admins.map(admin => ({name: admin.full_name, id: admin.id}))
    }

    const setSelectedAdminWrap = (id: number) => {
        if(my.role === 'super_admin'){
            setSelectedAdmin(-1)
            setFinance(null)
            setTimeout(() => setSelectedAdmin(id))    
        }
        else{
            setSelectedAdmin(id)
        }
    }

    return (
        <section className={classes.container}>
            {
                my.role === 'super_admin'
                    &&
                <section className={classes.choose}>
                    <ChooseItems
                        title='Админ'
                        selectedItems={[selectedAdmin || -1]}
                        setItem={setSelectedAdminWrap}
                        getData={getAdmins}
                    />
                </section>
            }
            {
                (selectedAdmin && selectedAdmin !== -1) 
                    ? 
                <Calendar onDateRangeSelect={setDate}/> 
                    : 
                <span>Выберите админа</span>
            }
            {
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
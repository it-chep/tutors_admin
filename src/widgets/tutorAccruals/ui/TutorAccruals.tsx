import { FC, useEffect, useState } from "react";
import classes from './tutorAccruals.module.scss'
import { AccrualItem, ITutorAccrual, tutorService } from "../../../entities/tutor";
import { useAppSelector } from "../../../app/store/store";
import { AuthError } from "../../../shared/err/AuthError";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { useMyActions } from "../../../entities/my";
import { LoaderSpinner } from "../../../shared/ui/spinner";
import { AddReceipt } from "../../../features/addReceipt";

interface IProps {
    onTrigger: () => void;
}

export const TutorAccruals: FC<IProps> = ({onTrigger}) => {

    const {my} = useAppSelector(s => s.myReducer)
    const [accruals, setAccruals] = useState<ITutorAccrual[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useMyActions()

    const saveReceipt = (id: number) => {
        return () => {
            onTrigger() // проверяем есть ли задолжность
            setAccruals(accruals => accruals.map(accrual => 
                accrual.id === id 
                ?
                {...accrual, is_receipt: true}
                :
                accrual
            ))
        }
    }

    const getPayments = async () => {
        try{
            setIsLoading(true)
            const accrualsRes = await tutorService.getAccruals(my.id)
            setAccruals(accrualsRes)
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: 'Ошибка при получении данных о выплатах репетитора', type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getPayments()
    }, [])

    return (
        <section className={classes.container}>
            <section className={classes.title}>
                Выплаты
            </section>
            {
                isLoading
                    ?
                <section className={classes.loader}>
                    <LoaderSpinner />
                </section>
                    :
                <section className={classes.items}>
                    {accruals.map(accrual =>
                        <AccrualItem 
                            key={accrual.id}    
                            accrual={accrual}
                        >
                            <AddReceipt 
                                accrualId={accrual.id}
                                onSaveTrigger={saveReceipt(accrual.id)}
                            />
                        </AccrualItem>
                    )}
                </section>
            }
        </section>
    )
}
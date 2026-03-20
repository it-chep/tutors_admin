import { useEffect, useState } from "react";
import { HOME_ROUTE, TUTOR_ACCRUALS_ROUTE } from "../../app/router/routes";
import { TutorAccruals } from "../../widgets/tutorAccruals";
import { LayoutPages } from "../layoutPages";
import classes from './tutorAccruals.module.scss'
import { useGlobalMessageActions } from "../../entities/globalMessage";
import { useMyActions } from "../../entities/my";
import { ReceiptFailer, tutorService } from "../../entities/tutor";
import { AuthError } from "../../shared/err/AuthError";
import { useAppSelector } from "../../app/store/store";
import { Navigate } from "react-router-dom";

export default function TutorAccrualsPage() {

    const [isFailer, setIsFailer] = useState<boolean>(false)
    const [trigger, setTrigger] = useState<number>(0)
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useMyActions()
    const {my} = useAppSelector(s => s.myReducer)

    const checkFailer = async () => {
        try{
            const isFailerRes = await tutorService.receiptFailerCheck()
            setIsFailer(isFailerRes)
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: 'Ошибка при получении данных о задолжности загрузки чека репетитора', type: 'error'})
            }
        }
    }

    const onTrigger = () => {
        setTrigger(trigger + 1)
    }
    useEffect(() => {
        checkFailer()
    }, [trigger])

    if(my.role !== 'tutor'){
        return <Navigate to={HOME_ROUTE.path} replace />
    }

    return (
        <LayoutPages title={TUTOR_ACCRUALS_ROUTE.name}>
            <section className={classes.wrapper}>
                {
                    isFailer
                        &&
                    <ReceiptFailer />
                }
                <TutorAccruals 
                    onTrigger={onTrigger}
                />
            </section>
        </LayoutPages>
    )
}
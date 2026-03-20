import { FC, useEffect, useState } from "react";
import classes from './addAccrualTutor.module.scss'
import { Modal } from "../../../shared/ui/modal";
import { MyButton } from "../../../shared/ui/button";
import { MyInput } from "../../../shared/ui/input";
import { useGlobalLoadingActions } from "../../../entities/globalLoading";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { tutorService } from "../../../entities/tutor";
import { AuthError } from "../../../shared/err/AuthError";
import { useMyActions } from "../../../entities/my";

interface IProps {
    tutorId: number;
}

export const AddAccrualTutor: FC<IProps> = ({tutorId}) => {

    const [amount, setAmount] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [open, setOpen] = useState<boolean>(false)
    const {setIsLoading} = useGlobalLoadingActions()
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useMyActions()

    const check = (): boolean => {
        if(!amount){
            setError('Введите сумму выплаты')
            return false
        }
        return true
    }

    const add = async () => {
        try{
            if(!check()){
                return
            }
            setIsLoading(true)
            await tutorService.addAccrual(tutorId, amount)
            setOpen(false)
        }
        catch(e){
            console.log(e)
            setOpen(false)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: 'Ошибка при добавлении выплаты', type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if(!open){
            setAmount('')
            setError('')
        }
    }, [open])

    return (
        <section className={classes.container}>
            <section className={classes.button}>
                <MyButton 
                    onClick={() => setOpen(true)}
                >
                    Добавить выплату
                </MyButton>
            </section>
            <Modal
                open={open}
                setOpen={setOpen}
            >
                <section className={classes.content}>
                    <MyInput
                        title="Сумма выплаты"
                        type="number"
                        value={amount}
                        setValue={setAmount}
                        setError={setError}
                    />
                    <MyButton
                        onClick={add}
                        error={error}
                    >
                        Добавить
                    </MyButton>
                </section>
            </Modal>
        </section>
    )
}
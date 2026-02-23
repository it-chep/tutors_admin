import { FC, useState } from "react";
import classes from './addManualTransaction.module.scss'
import { Modal } from "../../../shared/ui/modal";
import { MyInput } from "../../../shared/ui/input";
import { MyButton } from "../../../shared/ui/button";
import { useGlobalLoadingActions } from "../../../entities/globalLoading";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { AuthError } from "../../../shared/err/AuthError";
import { useMyActions } from "../../../entities/my";
import { studentService } from "../../../entities/student";
import { ConfirmationAction } from "../../../shared/ui/confirmationAction";

interface IProps {
    studentId: number;
    onSuccess?: () => void;
}

export const AddManualTransaction: FC<IProps> = ({studentId, onSuccess}) => {

    const [open, setOpen] = useState<boolean>(false)
    const [amount, setAmount] = useState<string>('')
    const [confirm, setConfirm] = useState<boolean>(false)
    const {setIsLoading} = useGlobalLoadingActions()
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useMyActions()

    const onClose = (open: boolean) => {
        if(!open){
            setConfirm(false)
            setAmount('')
        }
        setOpen(open)
    }

    const onSend = async () => {
        const amountNum = parseInt(amount, 10)
        if(!amountNum || amountNum <= 0){
            setGlobalMessage({type: 'error', message: 'Введите корректную сумму'})
            return
        }
        try{
            setOpen(false)
            setConfirm(false)
            setIsLoading(true)
            await studentService.addManualTransaction(studentId, amountNum)
            setAmount('')
            setGlobalMessage({type: 'ok', message: 'Транзакция успешно добавлена'})
            onSuccess?.()
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({type: 'error', message: 'Ошибка при добавлении транзакции'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    return (
        <section className={classes.container}>
            <MyButton onClick={() => setOpen(true)}>+ Добавить транзакцию</MyButton>
            <Modal open={open} setOpen={onClose}>
                {
                    confirm
                        ?
                    <ConfirmationAction
                        title="Подтвердить ручную транзакцию?"
                        setOpen={onClose}
                        onClick={onSend}
                        type="send"
                    />
                        :
                    <section className={classes.change}>
                        Ручная транзакция (сразу подтверждается)
                        <MyInput
                            type="number"
                            placeholder="1500"
                            title="Сумма (руб.)"
                            value={amount}
                            setValue={setAmount}
                        />
                        <MyButton onClick={() => setConfirm(true)}>Добавить</MyButton>
                    </section>
                }
            </Modal>
        </section>
    )
}

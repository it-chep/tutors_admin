import { FC, useEffect, useState } from "react";
import classes from './changeAllStudentsPayment.module.scss'
import { Modal } from "../../../shared/ui/modal";
import { MyButton } from "../../../shared/ui/button";
import { useGlobalLoadingActions } from "../../../entities/globalLoading";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { AuthError } from "../../../shared/err/AuthError";
import { useMyActions } from "../../../entities/my";
import { studentService } from "../../../entities/student";
import { ConfirmationAction } from "../../../shared/ui/confirmationAction";
import { adminService, IPayment } from "../../../entities/admin";
import { DropDownListSelected } from "../../../shared/ui/dropDownSelected";
import { IItem } from "../../../shared/model/types";

interface IProps {
    onSuccess?: () => void;
}

export const ChangeAllStudentsPayment: FC<IProps> = ({onSuccess}) => {

    const [open, setOpen] = useState<boolean>(false)
    const [confirm, setConfirm] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [payments, setPayments] = useState<IPayment[]>([])
    const [payment, setPayment] = useState<IPayment | null>(null)
    const {setIsLoading: setIsLoadingGlobal} = useGlobalLoadingActions()
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useMyActions()

    const getPayments = async () => {
        try{
            setIsLoading(true)
            const paymentsRes = await adminService.getPayments()
            setPayments(paymentsRes)
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({type: 'error', message: 'Ошибка при получении списка платежек'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getPayments()
    }, [])

    const onClose = (open: boolean) => {
        if(!open){
            setConfirm(false)
            setPayment(null)
        }
        setOpen(open)
    }

    const onSelected = (item: IItem) => {
        return (selected: boolean) => {
            if(selected){
                const target = payments.find(p => p.payment_id === item.id)
                if(target) setPayment(target)
            }
        }
    }

    const onSend = async () => {
        if(!payment){
            setGlobalMessage({type: 'error', message: 'Выберите платежку'})
            return
        }
        try{
            setOpen(false)
            setConfirm(false)
            setIsLoadingGlobal(true)
            await studentService.changeAllPayment(payment.payment_id)
            setPayment(null)
            setGlobalMessage({type: 'ok', message: 'Платежка успешно изменена у всех студентов'})
            onSuccess?.()
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({type: 'error', message: 'Ошибка при смене платежки у студентов'})
            }
        }
        finally{
            setIsLoadingGlobal(false)
        }
    }

    return (
        <section className={classes.container}>
            <MyButton onClick={() => setOpen(true)}>Сменить платежку всем</MyButton>
            <Modal open={open} setOpen={onClose}>
                {
                    confirm
                        ?
                    <ConfirmationAction
                        title="Сменить платежку всем студентам?"
                        setOpen={onClose}
                        onClick={onSend}
                        type="send"
                    />
                        :
                    <section className={classes.change}>
                        Сменить платежку всем студентам
                        <DropDownListSelected
                            items={payments.map(p => ({id: p.payment_id, name: p.payment_name}))}
                            selectedIdItems={payment ? [payment.payment_id] : []}
                            onSelected={onSelected}
                            isLoading={isLoading}
                            oneChoice
                        />
                        <MyButton onClick={() => setConfirm(true)}>Изменить</MyButton>
                    </section>
                }
            </Modal>
        </section>
    )
}

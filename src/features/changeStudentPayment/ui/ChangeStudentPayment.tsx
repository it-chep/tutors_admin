import { FC, useEffect, useState } from "react";
import classes from './changeStudentPayment.module.scss'
import editImg from '../../../shared/lib/assets/edit.png'
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
    studentId: number;
    payment_id: number;
    payment_name: string;
    setStudentPayment: (payment: IPayment) => void;
}

export const ChangeStudentPayment: FC<IProps> = ({studentId, payment_id, payment_name, setStudentPayment}) => {

    const [open, setOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [payments, setPayments] = useState<IPayment[]>([])
    const [payment, setPayment] = useState<IPayment>({payment_id, payment_name})
    const {setIsLoading: setIsLoadingGlobal} = useGlobalLoadingActions()
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useMyActions()
    const [confirm, setConfirm] = useState<boolean>(false)

    const update = async () => {
        try{
            setOpen(false)
            setConfirm(false)
            setIsLoadingGlobal(true)
            await studentService.changePayment(studentId, payment.payment_id)
            setStudentPayment(payment)
            setGlobalMessage({type: 'ok', message: 'Успешное редактирование платежки студента'})
        }   
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({type: 'error', message: 'Ошибка при редактировании платежки студента'})
            }
        }
        finally{
            setIsLoadingGlobal(false)
        }
    }

    const onClose = (open: boolean) => {
        if(!open){
            setConfirm(false)
        }
        setPayment({payment_id, payment_name})
        setOpen(open)
    }

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

    const onSelected = (item: IItem) => {
        return (selected: boolean) => {
            const targetPayment = payments.find(p => p.payment_id === item.id)
            if(targetPayment){
                setPayment(targetPayment)
            }
        }
    }

    return (
        <section className={classes.container}>
            <img src={editImg} onClick={() => setOpen(true)} />
            <Modal open={open} setOpen={onClose}>
                {
                    confirm
                        ?
                    <ConfirmationAction
                        title="Точно хотите изменить платежку студента ?"
                        setOpen={onClose}
                        onClick={update}
                        type="send"
                    />
                        :
                    <section className={classes.change}>
                        Изменить платежку студента
                        <DropDownListSelected 
                            items={payments.map(p => ({id: p.payment_id, name: p.payment_name}))}
                            selectedIdItems={[payment.payment_id]}
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
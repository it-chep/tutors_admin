import { FC, useEffect, useRef, useState } from "react";
import classes from './studentFilters.module.scss'
import { ToggleSwitch } from "../../../../shared/ui/toggleSwitch";
import { SelectedTgAdmins } from "../selectedTgAdmins/SelectedTgAdmins";
import { useSearchParams } from "react-router-dom";
import { adminService, IPayment } from "../../../../entities/admin";
import { DropDownListSelected } from "../../../../shared/ui/dropDownSelected";
import { IItem } from "../../../../shared/model/types";
import { useGlobalMessageActions } from "../../../../entities/globalMessage";

export const StudentFilters: FC = () => {

    const [params, setParams] = useSearchParams()

    const [isLost, setIsLost] = useState<boolean>(!!params.get('is_lost'))
    const [tgAdminIds, setTgAdminIds] = useState<number[]>(params.getAll('tg_admin_ids').map(id => parseInt(id, 10)).filter(id => !isNaN(id)))
    const [payments, setPayments] = useState<IPayment[]>([])
    const [isLoadingPayments, setIsLoadingPayments] = useState<boolean>(true)
    const [selectedPaymentIds, setSelectedPaymentIds] = useState<number[]>(
        params.getAll('payment_ids').map(id => parseInt(id, 10))
    )
    const {setGlobalMessage} = useGlobalMessageActions()

    const onSetParams = () => {
        const newParams = new URLSearchParams(params)
        newParams.delete('tg_admin_ids')
        if(tgAdminIds.length > 0){
            for(let id of tgAdminIds){
                newParams.append('tg_admin_ids', String(id))
            }
        }
        if(isLost){
            newParams.set('is_lost', String(isLost))
        }
        else{
            newParams.delete('is_lost')
        }
        newParams.delete('payment_ids')
        if(selectedPaymentIds.length > 0){
            for(let id of selectedPaymentIds){
                newParams.append('payment_ids', String(id))
            }
        }
        return newParams
    }

    const isOne = useRef<boolean>(true)
    useEffect(() => {
        if(isOne.current){
            isOne.current = false;
        }
        else{
            setParams(onSetParams())
        }
    }, [tgAdminIds, isLost, selectedPaymentIds])

    useEffect(() => {
        adminService.getPayments()
            .then(res => setPayments(res))
            .catch(() => setGlobalMessage({type: 'error', message: 'Ошибка при получении списка платежек'}))
            .finally(() => setIsLoadingPayments(false))
    }, [])

    const onPaymentSelected = (item: IItem) => {
        return (selected: boolean) => {
            if(selected){
                setSelectedPaymentIds(prev => [...prev, item.id])
            }
            else{
                setSelectedPaymentIds(prev => prev.filter(id => id !== item.id))
            }
        }
    }

    return (
        <section className={classes.container}>
            <span className={classes.sign}>Фильтры</span>
            <section className={classes.tgAdmins}>
                <span className={classes.label}>ТГ админы:</span>
                <SelectedTgAdmins
                    setTgAdmins={setTgAdminIds}
                    initTgAdmins={params.getAll('tg_admin_ids').map(id => parseInt(id, 10)).filter(id => !isNaN(id))}
                />
            </section>
            {
                (isLoadingPayments || payments.length > 0)
                    &&
                <section className={classes.payments}>
                    <span className={classes.label}>Платежки:</span>
                    <DropDownListSelected
                        selectedCount
                        items={payments.map(p => ({id: p.payment_id, name: p.payment_name}))}
                        selectedIdItems={selectedPaymentIds}
                        onSelected={onPaymentSelected}
                        isLoading={isLoadingPayments}
                    />
                </section>
            }
            <section className={classes.toggle}>
                Должники:
                <ToggleSwitch
                    checked={isLost}
                    onSelected={setIsLost}
                />
            </section>
        </section>
    )
}
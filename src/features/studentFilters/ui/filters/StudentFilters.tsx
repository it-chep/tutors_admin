import { FC, useEffect, useRef, useState } from "react";
import classes from './studentFilters.module.scss'
import { ToggleSwitch } from "../../../../shared/ui/toggleSwitch";
import { SelectedTgAdmins } from "../selectedTgAdmins/SelectedTgAdmins";
import { useSearchParams } from "react-router-dom";
import { adminService, IPayment } from "../../../../entities/admin";
import { DropDownListSelected } from "../../../../shared/ui/dropDownSelected";
import { IItem } from "../../../../shared/model/types";
import { useGlobalMessageActions } from "../../../../entities/globalMessage";

interface IProps {
    onSelectedFilters: () => void;
}

export const StudentFilters: FC<IProps> = ({onSelectedFilters}) => {

    const [params, setParams] = useSearchParams()

    const [isLost, setIsLost] = useState<boolean>(!!params.get('is_lost'))
    const [tgAdmins, setTgAdmins] = useState<string[]>(params.getAll('tg_admins'))
    const [payments, setPayments] = useState<IPayment[]>([])
    const [isLoadingPayments, setIsLoadingPayments] = useState<boolean>(true)
    const [selectedPaymentIds, setSelectedPaymentIds] = useState<number[]>(
        params.getAll('payment_ids').map(id => parseInt(id, 10))
    )
    const {setGlobalMessage} = useGlobalMessageActions()

    const onSetParams = () => {
        const newParams = new URLSearchParams(params)
        newParams.delete('tg_admins')
        if(tgAdmins.length > 0){
            for(let tg of tgAdmins){
                newParams.append('tg_admins', tg)
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
    }, [tgAdmins, isLost, selectedPaymentIds])

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
            <span>Фильтры</span>
            <section className={classes.tgAdmins}>
                <span className={classes.label}>ТГ админы:</span>
                <SelectedTgAdmins
                    setTgAdmins={setTgAdmins}
                    initTgAdmins={params.getAll('tg_admins')}
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
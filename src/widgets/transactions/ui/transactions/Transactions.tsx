import { FC, useCallback, useEffect, useRef, useState } from "react";
import { ITransaction, studentService, TransactionItemMobile } from "../../../../entities/student";
import { useGlobalMessageActions } from "../../../../entities/globalMessage";
import { useMyActions } from "../../../../entities/my";
import { AuthError } from "../../../../shared/err/AuthError";
import classes from './transactions.module.scss'
import { Calendar } from "../../../../shared/ui/calendar";
import { OpenContainer } from "../../../../features/openContainer";
import { LoaderSpinner } from "../../../../shared/ui/spinner";
import { getDateUTC } from "../../../../shared/lib/helpers/getDateUTC";
import { Table } from "../table/Table";
import { AddManualTransaction } from "../../../../features/addManualTransaction";
import { useAppSelector } from "../../../../app/store/store";

interface IProps {
    studentId: number;
}

export const Transactions: FC<IProps> = ({studentId}) => {

    const [transactions, setTransactions] = useState<ITransaction[] | null>(null)
    const [count, setCount] = useState<number>(0)
    const [totalConfirmedAmount, setTotalConfirmedAmount] = useState<string>('0')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useMyActions()
    const {my} = useAppSelector(s => s.myReducer)
    const dateRangeRef = useRef<{from: string, to: string} | null>(null)

    const getTransactions = async (from: string, to: string) => {
        try{
            setIsLoading(true)
            const transactionsRes = await studentService.transactions(studentId, from, to)
            setTransactions(transactionsRes.transactions)
            setCount(transactionsRes.transactions_count)
            setTotalConfirmedAmount(transactionsRes.total_confirmed_amount)
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: 'Ошибка при получении транзакций студента', type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    const setDate = useCallback((startDate: Date | null, endDate: Date | null) => {
        if(startDate && endDate){
            const from = getDateUTC(startDate)
            const to = getDateUTC(endDate)
            dateRangeRef.current = {from, to}
            getTransactions(from, to)
        }
    }, [])

    const onManualTransactionAdded = () => {
        if(dateRangeRef.current){
            getTransactions(dateRangeRef.current.from, dateRangeRef.current.to)
        }
    }

    const [trigger, setTrigger] = useState<number>(0)
    useEffect(() => {
        setTrigger(trigger + 1)
    }, [isLoading, transactions])

    return (
        <section className={classes.container}>
            <OpenContainer title="Транзакции" trigger={trigger}>
                <section className={classes.content}>
                    <section className={classes.header}>
                        <Calendar onDateRangeSelect={setDate} />
                        {
                            (my.role === 'admin' || my.role === 'assistant') && my.paid_functions['manual_transaction']
                                &&
                            <AddManualTransaction studentId={studentId} onSuccess={onManualTransactionAdded} />
                        }
                    </section>
                    {
                        isLoading
                            ?
                        <section className={classes.loader}><LoaderSpinner /></section>
                            :
                        transactions
                            &&
                        <>
                        {
                            !isLoading
                                &&
                            <>
                                <section className={classes.count}>Кол-во транзакций: {count}</section>
                                <section className={classes.count}>Сумма подтверждённых: {totalConfirmedAmount} ₽</section>
                            </>
                        }
                        {
                            transactions.length
                                ?
                            <>
                                <Table 
                                    transactions={transactions}
                                />
                                <section className={classes.items}>
                                    {transactions.map((transaction, ind) => 
                                        <TransactionItemMobile
                                            key={transaction.id} 
                                            transaction={transaction} 
                                        />
                                    )}
                                </section>
                            </>
                                :
                            <></>
                        }
                        </>
                    }
                </section>
            </OpenContainer>
        </section>
    )
}
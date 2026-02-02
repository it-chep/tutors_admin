import { FC } from "react";
import classes from './table.module.scss'
import { AdminTransactionItem, ITransactionsAdmin } from "../../../../entities/admin";

interface IProps{
    transactions: ITransactionsAdmin[];
}

export const Table: FC<IProps> = ({transactions}) => {

    return (
        <table className={classes.table}>
            <thead>
                <tr className={classes.item}>
                    <th>Дата</th>
                    <th>Сумма</th>
                    <th>Подтвержденная</th>
                    <th>ФИО студента</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map((transaction, ind) => 
                    <AdminTransactionItem 
                        key={transaction.id} 
                        transaction={transaction} 
                    />
                )}
            </tbody>
        </table>
    )
}
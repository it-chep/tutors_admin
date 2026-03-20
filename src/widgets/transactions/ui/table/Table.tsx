import { FC } from "react";
import classes from './table.module.scss'
import { ITransaction, TransactionItem } from "../../../../entities/student";


interface IProps {
    transactions: ITransaction[];
}

export const Table: FC<IProps> = ({transactions}) => {


    return (
        <section className={classes.wrapTable}>
            <table className={classes.table}>
                <thead>
                    <tr className={classes.item}>
                        <th>Дата</th>
                        <th>Сумма</th>
                        <th>Подтвержденная</th>
                        <th>Ручная</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, ind) => 
                        <TransactionItem 
                            key={transaction.id} 
                            transaction={transaction} 
                        />
                    )}
                </tbody>
            </table>
        </section>
    )
}
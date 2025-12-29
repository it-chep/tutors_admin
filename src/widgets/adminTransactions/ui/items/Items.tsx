import { FC } from "react";
import classes from './items.module.scss'
import { AdminTransactionItemMobile, ITransactionsAdmin } from "../../../../entities/admin";

interface IProps{
    transactions: ITransactionsAdmin[];
}

export const Items: FC<IProps> = ({transactions}) => {

    return (
        <section className={classes.items}>
            {transactions.map((transaction, ind) => 
                <AdminTransactionItemMobile
                    key={transaction.id} 
                    transaction={transaction} 
                />
            )}
        </section>
    )
}
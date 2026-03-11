import { FC } from "react";
import { ITransactions } from "../../model/types";
import classes from './transactionItem.module.scss'
import { formatUtcToMsk } from "../../../../shared/lib/helpers/formatUtcToMsk";

interface IProps {
    transaction: ITransactions;
}

export const TransactionItem: FC<IProps> = ({transaction}) => {

    return (
        <tr 
            className={classes.item}
        >
            <td>
                {formatUtcToMsk(transaction.created_at)} (мск)
            </td>  
            <td>
                {transaction.amount}
            </td>
            <td>
                {transaction.is_confirmed ? <>&#9989;</> : <>&#10060;</>}
            </td>
        </tr>
    )
}

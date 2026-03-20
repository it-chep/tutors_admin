import { FC } from "react";
import { ITransaction } from "../../model/types";
import classes from './transactionItem.module.scss'
import { formatUtcToMsk } from "../../../../shared/lib/helpers/formatUtcToMsk";

interface IProps {
    transaction: ITransaction;
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
            <td>
                {transaction.is_manual ? <>&#9989;</> : <>&#10060;</>}
            </td>
        </tr>
    )
}

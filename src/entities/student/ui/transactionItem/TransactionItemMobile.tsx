import { FC } from "react";
import { ITransactions } from "../../model/types";
import classes from './transactionItem.module.scss'
import { getLocaleDate } from "../../../../shared/lib/helpers/getLocalDate";
import { LabelText } from "../../../../shared/ui/sign";

interface IProps {
    transaction: ITransactions;
}

export const TransactionItemMobile: FC<IProps> = ({transaction}) => {

    return (
        <section 
            className={classes.itemMobile}
        >
            <LabelText
                label="Дата"
                text={getLocaleDate(new Date(transaction.created_at + 'Z'), true)}         
            />
            <LabelText
                label="Сумма"
                text={transaction.amount}         
            />
            <LabelText
                label="Подтвержденная"
                text={transaction.is_confirmed ? <>&#9989;</> : <>&#10060;</>}         
            />
        </section>
    )
}
import { FC } from "react";
import { ITransactions } from "../../model/types";
import classes from './transactionItem.module.scss'
import { formatUtcToMsk } from "../../../../shared/lib/helpers/formatUtcToMsk";
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
                text={formatUtcToMsk(transaction.created_at) + (" (мск)")}
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

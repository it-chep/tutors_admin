import { FC } from "react";
import { Calendar } from "../../../../shared/ui/calendar";
import { LoaderSpinner } from "../../../../shared/ui/spinner";
import classes from '../assistantPenaltyBonus.module.scss'
import { IPenaltyBonusItem, IPenaltyBonusSummary, PenaltiesBonuses } from "../../../../entities/penaltyBonus";

interface IProps {
    setDate: (startDate: Date | null, endDate: Date | null) => void;
    isLoading: boolean;
    items: IPenaltyBonusItem[];
    summary: IPenaltyBonusSummary | null;
}

export const Data: FC<IProps> = ({setDate, items, isLoading, summary}) => {

    return (
        <>
            <Calendar onDateRangeSelect={setDate} />
            {
                isLoading
                    ?
                <section className={classes.loader}><LoaderSpinner /></section>
                    :
                (items.length && summary)
                    ?
                <section className={classes.data}>
                    <PenaltiesBonuses
                        items={items}
                        summary={summary}
                    />
                </section>
                    :
                <></>
            }
        </>
    )
}
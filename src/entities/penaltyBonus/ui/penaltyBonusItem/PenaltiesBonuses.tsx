import { FC } from "react";
import classes from './penaltiesBonuses.module.scss'
import { LabelText } from "../../../../shared/ui/sign";
import { formatUtcToMsk } from "../../../../shared/lib/helpers/formatUtcToMsk";
import { IPenaltyBonusItem, IPenaltyBonusSummary } from "../../model/types";

interface IProps {
    items: IPenaltyBonusItem[];
    summary: IPenaltyBonusSummary;
}

export const PenaltiesBonuses: FC<IProps> = ({items, summary}) => {

    return (
        <section className={classes.container}>
            <section className={classes.total}>
                <span>Общее кол-во премий: {summary.bonuses}</span>
                <span>Общее кол-во штрафов: {summary.penalties}</span>
            </section>
            <section className={classes.items}>
                {items.map(item => 
                    <section
                        key={item.id}
                        className={classes.item}
                    >
                        <section className={classes.header}>
                            <section 
                                className={classes.type + (item.type === 'bonus' ? ` ${classes.bonus}` : '')}
                            >
                                {
                                    item.type === 'bonus' 
                                        ? 
                                    'Премия' 
                                        : 
                                    'Штраф'
                                }
                            </section>
                            &nbsp;на сумму&nbsp;
                            <section className={classes.amountWrap}>
                                <span className={classes.amount}>{item.amount}</span>
                                <svg className={classes.rub} width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7 22H18" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M11 27V5H18.5C20.2239 5 21.8772 5.68482 23.0962 6.90381C24.3152 8.12279 25 9.77609 25 11.5C25 13.2239 24.3152 14.8772 23.0962 16.0962C21.8772 17.3152 20.2239 18 18.5 18H7" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </section>
                            <section className={classes.created}>
                                {formatUtcToMsk(item.created_at)} (мск)
                            </section>
                        </section>
                        <section className={classes.comment}>
                            <LabelText
                                label="Комментарий"
                                text={item.comment}
                            />
                        </section>
                    </section>
                )}
            </section>
        </section>
    )
}
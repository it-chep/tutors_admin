import { FC, PropsWithChildren } from "react";
import classes from './accrualItem.module.scss'
import { ITutorAccrual } from "../../model/types";


interface IProps {
    accrual: ITutorAccrual;
}

export const AccrualItem: FC<IProps & PropsWithChildren> = ({accrual, children}) => {


    return (
        <section className={classes.container}>
            <section className={classes.iconBox}>
                <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M28 7H4C3.44772 7 3 7.44772 3 8V24C3 24.5523 3.44772 25 4 25H28C28.5523 25 29 24.5523 29 24V8C29 7.44772 28.5523 7 28 7Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 21H25" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15 21H17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 12.1125H29" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </section>
            <section className={classes.amountWrap}>
                Выплата на сумму&nbsp;<span className={classes.amount}>{accrual.amount}</span>
                <svg className={classes.rub} width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 22H18" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M11 27V5H18.5C20.2239 5 21.8772 5.68482 23.0962 6.90381C24.3152 8.12279 25 9.77609 25 11.5C25 13.2239 24.3152 14.8772 23.0962 16.0962C21.8772 17.3152 20.2239 18 18.5 18H7" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </section>
            <section className={classes.date}>
                {accrual.date}
            </section>
            <section className={classes.check}>
                <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.5 13H22.5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9.5 17H22.5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4 26V7C4 6.73478 4.10536 6.48043 4.29289 6.29289C4.48043 6.10536 4.73478 6 5 6H27C27.2652 6 27.5196 6.10536 27.7071 6.29289C27.8946 6.48043 28 6.73478 28 7V26L24 24L20 26L16 24L12 26L8 24L4 26Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {
                    accrual.is_receipt
                        ?
                    <section className={classes.confirmed}>
                        загружен
                    </section>
                        :
                    children
                }
            </section>
        </section>
    )
}
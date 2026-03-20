import { Navigate } from "react-router-dom";
import { HOME_ROUTE, TUTOR_FINANCE_ROUTE } from "../../app/router/routes";
import { useAppSelector } from "../../app/store/store";
import { TutorPenaltyBonus } from "../../widgets/tutorPenaltyBonus";
import { LayoutPages } from "../layoutPages";
import { TutorFinance } from "../../widgets/tutorFinance";
import classes from './tutorFinance.module.scss'

export default function TutorFinancePage() {

    const {my} = useAppSelector(s => s.myReducer)

    if(my.role !== 'tutor'){
        return <Navigate to={HOME_ROUTE.path} />
    }

    return (
        <LayoutPages title={TUTOR_FINANCE_ROUTE.name}>
            <section className={classes.container}>
                <section className={classes.finance}>
                    <section className={classes.title}>
                        Финансы
                    </section>
                    <TutorFinance 
                        id={my.id}
                    />
                </section>
                <TutorPenaltyBonus 
                    tutorId={null} 
                />
            </section>
        </LayoutPages>
    )
}
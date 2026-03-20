import { FINANCE_ROUTE, HOME_ROUTE } from '../../app/router/routes'
import { useAppSelector } from '../../app/store/store'
import { FinanceWidget } from '../../widgets/finance'
import { LayoutPages } from '../layoutPages'
import { TRole } from '../../entities/my'
import { Navigate } from 'react-router-dom'
import { AssistantPenaltyBonus } from '../../widgets/assistantPenaltyBonus'
import classes from './finance.module.scss'

const roles: TRole[] = ['super_admin', 'admin', 'assistant'] 

export default function FinancePage() {

    const {my} = useAppSelector(s => s.myReducer)
    const isAccess = roles.includes(my.role)
    
    if(!isAccess){
        return (
            <Navigate to={HOME_ROUTE.path} replace />
        )
    }

    return (
        <LayoutPages title={FINANCE_ROUTE.name}>
            <section className={classes.container}>
                <section className={classes.finance}>
                    <FinanceWidget />
                </section>
                {
                    (my.role === 'assistant')
                        &&
                    <AssistantPenaltyBonus 
                        assistantId={null} 
                    />
                }
            </section>
        </LayoutPages>
    )
}
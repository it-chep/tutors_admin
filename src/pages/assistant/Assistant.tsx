import { ASSISTANT_ROUTE, HOME_ROUTE } from '../../app/router/routes'
import { useAppSelector } from '../../app/store/store'
import { TRole } from '../../entities/my'
import { AssistantWidget } from '../../widgets/assistant';
import { AssistantPenaltyBonus } from '../../widgets/assistantPenaltyBonus';
import { LayoutPages } from '../layoutPages'
import { Navigate, useParams } from 'react-router-dom';
import classes from './assistant.module.scss'

const roles: TRole[] = ['admin', 'assistant'] 

export default function AssistantPage() {

    const {id} = useParams<{id: string}>()
    
    const {my} = useAppSelector(s => s.myReducer)

    const isAccessAdmin = (my.role === 'admin') && my.paid_functions['assistant']
    const isAccessAssistant = (my.role === 'assistant') && my.paid_functions['can_penalize_assistants']

    const isAccess = roles.includes(my.role) && (isAccessAdmin || isAccessAssistant) 
    
    if(!isAccess){
        return (
            <Navigate to={HOME_ROUTE.path} replace />
        )
    }

    return (
        id  
            ?
        <LayoutPages title={ASSISTANT_ROUTE.name}>
            <AssistantWidget 
                isAdmin={my.role === 'admin'}
                assistantId={+id} 
            />
            <section className={classes.widget}>
                <AssistantPenaltyBonus assistantId={+id} />
            </section>
        </LayoutPages>
            :
        <></>
    )
}
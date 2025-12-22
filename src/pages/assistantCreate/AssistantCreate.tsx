import { ASSISTANT_CREATE_ROUTE, HOME_ROUTE } from '../../app/router/routes'
import { LayoutPages } from '../layoutPages'
import { TRole } from '../../entities/my'
import { useAppSelector } from '../../app/store/store'
import { Navigate } from 'react-router-dom'
import { AssistantChange } from '../../features/assistantChange'
import { AssistantCreate } from '../../widgets/assistantCreate'

const roles: TRole[] = ['admin'] 

export default function AssistantCreatePage() {
    
    const {my} = useAppSelector(s => s.myReducer)
    const isAccess = roles.includes(my.role) && my.paid_functions['assistant']
    
    if(!isAccess){
        return (
            <Navigate to={HOME_ROUTE.path} replace />
        )
    }

    return (
        <LayoutPages title={ASSISTANT_CREATE_ROUTE.name}>
            <AssistantCreate />
        </LayoutPages>
    )
}
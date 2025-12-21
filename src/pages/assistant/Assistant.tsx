import { ASSISTANT_ROUTE, HOME_ROUTE } from '../../app/router/routes'
import { useAppSelector } from '../../app/store/store'
import { TRole } from '../../entities/my'
import { AssistantWidget } from '../../widgets/assistant';
import { LayoutPages } from '../layoutPages'
import { Navigate, useParams } from 'react-router-dom';

const roles: TRole[] = ['admin'] 

export default function AssistantPage() {

    const {id} = useParams<{id: string}>()
    
    const {my} = useAppSelector(s => s.myReducer)
    const isAccess = roles.includes(my.role) && my.paid_functions['assistant']
    
    if(!isAccess){
        return (
            <Navigate to={HOME_ROUTE.path} replace />
        )
    }

    return (
        id  
            ?
        <LayoutPages title={ASSISTANT_ROUTE.name}>
            <AssistantWidget id={+id} />
        </LayoutPages>
            :
        <></>
    )
}
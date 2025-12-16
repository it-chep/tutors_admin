import { ASSISTANTS_ROUTE, HOME_ROUTE } from '../../app/router/routes'
import { useAppSelector } from '../../app/store/store'
import { TRole } from '../../entities/my'
import { AssistantsWidget } from '../../widgets/assistants';
import { LayoutPages } from '../layoutPages'
import { Navigate } from 'react-router-dom';

const roles: TRole[] = ['admin'] 

export default function AssistantsPage() {

    const {my} = useAppSelector(s => s.myReducer)
    const isAccess = roles.includes(my.role)

    if(!isAccess){
        return (
            <Navigate to={HOME_ROUTE.path} replace />
        )
    }

    return (
        <LayoutPages title={ASSISTANTS_ROUTE.name}>
            <AssistantsWidget />
        </LayoutPages>
    )
}
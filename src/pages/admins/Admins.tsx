import { HOME_ROUTE, STUDENT_ROUTE } from '../../app/router/routes'
import { useAppSelector } from '../../app/store/store'
import { TRole } from '../../entities/my'
import { StudentWidget } from '../../widgets/student'
import { LayoutPages } from '../layoutPages'
import { Navigate } from 'react-router-dom';

const roles: TRole[] = ['super_admin'] 

export default function AdminsPage() {

    const {my} = useAppSelector(s => s.myReducer)
    const isAccess = roles.includes(my.role)

    if(!isAccess){
        return (
            <Navigate to={HOME_ROUTE.path} replace />
        )
    }

    return (
        <LayoutPages title={STUDENT_ROUTE.name}>
            <StudentWidget />
        </LayoutPages>
    )
}
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../../../app/store/store'
import { TRole } from '../../../entities/my'
import { TutorsArchive } from '../../../widgets/tutorsArchive'
import { HOME_ROUTE } from '../../../app/router/routes'

const roles: TRole[] = ['admin', 'assistant'] 

export default function TutorsArchivePage() {

    const {my} = useAppSelector(s => s.myReducer)

    const isAccess = roles.includes(my.role) && my.paid_functions['tutor_archive']
    
    if(!isAccess){
        return (
            <Navigate to={HOME_ROUTE.path} replace />
        )
    }

    return (
        <TutorsArchive />
    )
}

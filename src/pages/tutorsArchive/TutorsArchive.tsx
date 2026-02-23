import { Navigate } from 'react-router-dom'
import { HOME_ROUTE, TUTORS_ARCHIVE_ROUTE } from '../../app/router/routes'
import { useAppSelector } from '../../app/store/store'
import { TRole } from '../../entities/my'
import { LayoutPages } from '../layoutPages'
import { TutorsArchive } from '../../widgets/tutorsArchive'

const roles: TRole[] = ['admin', 'assistant']

export default function TutorsArchivePage() {

    const {my} = useAppSelector(s => s.myReducer)
    const isAccess = roles.includes(my.role)

    if(!isAccess){
        return (
            <Navigate to={HOME_ROUTE.path} replace />
        )
    }

    return (
        <LayoutPages title={TUTORS_ARCHIVE_ROUTE.name}>
            <TutorsArchive />
        </LayoutPages>
    )
}

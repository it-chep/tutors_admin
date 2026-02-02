import { Navigate } from 'react-router-dom'
import { HOME_ROUTE, STUDENTS_ARCHIVE_ROUTE } from '../../app/router/routes'
import { useAppSelector } from '../../app/store/store'
import { TRole } from '../../entities/my'
import { LayoutPages } from '../layoutPages'
import { StudentsArchive } from '../../widgets/studentsArchive'

const roles: TRole[] = ['admin', 'assistant'] 

export default function StudentsArchivePage() {

    const {my} = useAppSelector(s => s.myReducer)

    const isAccess = roles.includes(my.role) && my.paid_functions['student_archive']
    
    if(!isAccess){
        return (
            <Navigate to={HOME_ROUTE.path} replace />
        )
    }

    return (
        <LayoutPages title={STUDENTS_ARCHIVE_ROUTE.name}>
            <StudentsArchive />
        </LayoutPages>
    )
}
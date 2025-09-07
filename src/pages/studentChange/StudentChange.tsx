import { useLocation } from 'react-router-dom'
import { STUDENT_CREATE_ROUTE } from '../../app/router/routes'
import { StudentChange } from '../../features/studentChange'
import { LayoutPages } from '../layoutPages'


export default function StudentChangePage() {

    const {pathname} = useLocation()

    const isCreate = pathname === STUDENT_CREATE_ROUTE.path;

    return (
        <LayoutPages title={STUDENT_CREATE_ROUTE.name}>
            <StudentChange isCreate={isCreate} />
        </LayoutPages>
    )
}
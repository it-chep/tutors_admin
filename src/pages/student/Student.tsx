import { STUDENT_ROUTE } from '../../app/router/routes'
import { StudentWidget } from '../../widgets/student'
import { LayoutPages } from '../layoutPages'


export default function StudentPage() {

    return (
        <LayoutPages title={STUDENT_ROUTE.name}>
            <StudentWidget />
        </LayoutPages>
    )
}
import { STUDENTS_ROUTE } from '../../app/router/routes'
import { StudentsWidget } from '../../widgets/students'
import { LayoutPages } from '../layoutPages'
import classes from './students.module.scss'


export default function StudentsPage() {

    return (
        <LayoutPages title={STUDENTS_ROUTE.name}>
            <StudentsWidget />
        </LayoutPages>
    )
}
import { STUDENTS_ROUTE } from '../../app/router/routes'
import { studentService } from '../../entities/student'
import { StudentsWidget } from '../../widgets/students'
import { LayoutPages } from '../layoutPages'


export default function StudentsPage() {

    return (
        <LayoutPages title={STUDENTS_ROUTE.name}>
            <StudentsWidget 
                add={true} 
                request={studentService.getAll} 
            />
        </LayoutPages>
    )
}
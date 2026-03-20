import { useOutletContext } from 'react-router-dom'
import { useAppSelector } from '../../../app/store/store'
import { studentService } from '../../../entities/student'
import { StudentsWidget } from '../../../widgets/students'


export default function StudentsPage() {

    const {my} = useAppSelector(s => s.myReducer)

    const trigger: boolean = useOutletContext()

    const permission = (my.role === 'admin' || my.role === 'assistant' || my.role === 'super_admin')

    return (
        <StudentsWidget 
            request={permission ? studentService.getAll : () => studentService.getAllByTutor(my.id)} 
            triggerReq={trigger}
            highlight={permission}
        />
    )
}
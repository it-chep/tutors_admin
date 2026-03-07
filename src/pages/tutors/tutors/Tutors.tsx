import { useAppSelector } from '../../../app/store/store'
import { tutorService } from '../../../entities/tutor'
import { TutorsWidget } from '../../../widgets/tutors'


export default function TutorsPage() {

    const {my} = useAppSelector(s => s.myReducer)

    const permission = (my.role === 'admin' || my.role === 'assistant' || my.role === 'super_admin')

    return (
        <TutorsWidget
            request={tutorService.getAll}
            highlight={permission}
        />
    )
}

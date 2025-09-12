import { TUTORS_ROUTE } from '../../app/router/routes'
import { tutorService } from '../../entities/tutor'
import { TutorsWidget } from '../../widgets/tutors'
import { LayoutPages } from '../layoutPages'


export default function TutorsPage() {

    return (
        <LayoutPages title={TUTORS_ROUTE.name}>
            <TutorsWidget 
                add={true}
                request={tutorService.getAll}
            />
        </LayoutPages>
    )
}
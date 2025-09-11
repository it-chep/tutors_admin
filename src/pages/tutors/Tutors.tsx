import { TUTORS_ROUTE } from '../../app/router/routes'
import { TutorsWidget } from '../../widgets/tutors'
import { LayoutPages } from '../layoutPages'


export default function TutorsPage() {

    return (
        <LayoutPages title={TUTORS_ROUTE.name}>
            <TutorsWidget />
        </LayoutPages>
    )
}
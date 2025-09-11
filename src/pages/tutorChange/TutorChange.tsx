import { TUTOR_CREATE_ROUTE } from '../../app/router/routes'
import { TutorChange } from '../../features/tutorChange'
import { LayoutPages } from '../layoutPages'


export default function TutorChangePage() {

    return (
        <LayoutPages title={TUTOR_CREATE_ROUTE.name}>
            <TutorChange />
        </LayoutPages>
    )
}
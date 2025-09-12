import { useParams } from 'react-router-dom'
import { TUTOR_ROUTE } from '../../app/router/routes'
import { studentService } from '../../entities/student'
import { StudentsWidget } from '../../widgets/students'
import { TutorWidget } from '../../widgets/tutor'
import { LayoutPages } from '../layoutPages'


export default function TutorPage() {

    const {id} = useParams<{id: string}>()

    return (
        id
            ?
        <LayoutPages title={TUTOR_ROUTE.name}>
            <TutorWidget id={+id}>
                <StudentsWidget 
                    add={false}
                    request={() => studentService.getAllByTutor(+id)}
                />
            </TutorWidget>
        </LayoutPages>
            :
        <></>
    )
}
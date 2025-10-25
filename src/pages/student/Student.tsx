import { Navigate, useParams } from 'react-router-dom'
import { HOME_ROUTE, STUDENT_ROUTE } from '../../app/router/routes'
import { StudentWidget } from '../../widgets/student'
import { LayoutPages } from '../layoutPages'
import { Lessons } from '../../widgets/lessons'

export default function StudentPage() {

    const {id} = useParams<{id: string}>()

    if(!id){
        return <Navigate to={HOME_ROUTE.path} />
    }

    return (
        <LayoutPages title={STUDENT_ROUTE.name}>
            <StudentWidget id={+id}>
                <Lessons studentId={+id}/>
            </StudentWidget>
        </LayoutPages>
    )
}
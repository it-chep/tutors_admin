import { Navigate, useLocation } from 'react-router-dom'
import { HOME_ROUTE, STUDENT_CREATE_ROUTE } from '../../app/router/routes'
import { StudentChange } from '../../features/studentChange'
import { LayoutPages } from '../layoutPages'
import { ChooseItems } from '../../features/chooseSubject'
import { useAppSelector } from '../../app/store/store'
import { useStudentActions } from '../../entities/student'
import { subjectService } from '../../entities/subject'
import { tutorService } from '../../entities/tutor'
import { TRole } from '../../entities/my'

const roles: TRole[] = ['super_admin', 'admin'] 

export default function StudentChangePage() {

    const {pathname} = useLocation()

    const isCreate = pathname === STUDENT_CREATE_ROUTE.path;

    const {student} = useAppSelector(s => s.studentReducer)
    const {setSubjectId, setTutorId} = useStudentActions()

    const {my} = useAppSelector(s => s.myReducer)
    const isAccess = roles.includes(my.role)
    
    if(!isAccess){
        return (
            <Navigate to={HOME_ROUTE.path} replace />
        )
    }

    return (
        <LayoutPages title={STUDENT_CREATE_ROUTE.name}>
            <StudentChange 
                isCreate={isCreate} 
                chooseSubject={
                    <ChooseItems 
                        title='Предмет'
                        selectedItems={[student.subject_id]}
                        setItem={setSubjectId}
                        getData={subjectService.getAll}
                    />
                }
                chooseTutor={
                    <ChooseItems 
                        title='Репетитор'
                        selectedItems={[student.tutor_id]}
                        setItem={setTutorId}
                        getData={async () => {
                                const data = await tutorService.getAll()
                                return data.map(d => ({id: d.id, name: d.full_name}))
                            }
                        }
                    />
                }
            />
        </LayoutPages>
    )
}
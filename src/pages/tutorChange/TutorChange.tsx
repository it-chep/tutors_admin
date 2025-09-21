import { useState } from 'react'
import { HOME_ROUTE, TUTOR_CREATE_ROUTE } from '../../app/router/routes'
import { TutorChange } from '../../features/tutorChange'
import { LayoutPages } from '../layoutPages'
import { ITutorCreate, tutorChange } from '../../entities/tutor'
import { ChooseItems } from '../../features/chooseSubject'
import { subjectService } from '../../entities/subject'
import { TRole } from '../../entities/my'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../../app/store/store'
import { adminService } from '../../entities/admin'

const roles: TRole[] = ['super_admin', 'admin'] 

export default function TutorChangePage() {

    const [tutor, setTutor] = useState<ITutorCreate>({
        full_name: '',
        cost_per_hour: '',
        phone: '',
        tg: '',
        subject_id: -1,
        email: '',
        admin_id: -1,
    })

    const {setSubjectId, setAdminId} = tutorChange(tutor, setTutor)

    const {my} = useAppSelector(s => s.myReducer)
    const isAccess = roles.includes(my.role)
    
    if(!isAccess){
        return (
            <Navigate to={HOME_ROUTE.path} replace />
        )
    }

    const getAdmins = async() => {
        const admins = await adminService.getAll()
        return admins.map(admin => ({name: admin.full_name, id: admin.id}))
    }

    return (
        <LayoutPages title={TUTOR_CREATE_ROUTE.name}>
            <TutorChange 
                tutor={tutor}
                setTutor={setTutor}
            >
                <>
                    <ChooseItems 
                        title='Предмет'
                        selectedItems={[tutor.subject_id]}
                        setItem={setSubjectId}
                        getData={subjectService.getAll}
                    />
                    {
                        my.role === 'super_admin'
                            &&
                        <ChooseItems 
                            title='Админ'
                            selectedItems={[tutor.admin_id]}
                            setItem={setAdminId}
                            getData={getAdmins}
                        />
                    }
                </>
            </TutorChange>
        </LayoutPages>
    )
}
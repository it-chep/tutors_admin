import { useEffect, useState } from 'react'
import { HOME_ROUTE, TUTOR_CREATE_ROUTE, TUTORS_ROUTE } from '../../app/router/routes'
import { TutorChange } from '../../features/tutorChange'
import { LayoutPages } from '../layoutPages'
import { ChooseItems } from '../../features/chooseItems'
import { TRole } from '../../entities/my'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import { useAppSelector } from '../../app/store/store'
import { adminService } from '../../entities/admin'
import { IFormError } from '../../shared/model/types'
import { changeFormError } from '../../shared/lib/helpers/ChangeFormError'
import { ITutorChange, useTutorActions } from '../../entities/tutor'
import { subjectService } from '../../entities/subject'

const roles: TRole[] = ['super_admin', 'admin', 'assistant']

export default function TutorChangePage() {

    const {pathname} = useLocation()
    const {tutor} = useAppSelector(s => s.tutorReducer)
    const {setTgAdminUsernameId, setSubjectId, setInit} = useTutorActions()

    const isCreate = pathname === TUTOR_CREATE_ROUTE.path

    const {my} = useAppSelector(s => s.myReducer)
    const isAccess = roles.includes(my.role)

    const [formError, setFormError] = useState<IFormError<ITutorChange>[]>([])
    const setErrorFieldDelete = changeFormError(formError, setFormError)

    const getAdmins = async() => {
        const admins = await adminService.getAll()
        return admins.map(admin => ({name: admin.full_name, id: admin.id}))
    }

    useEffect(() => {
        return () => {
            setInit()
        }
    }, [])

    if(!isAccess){
        return (
            <Navigate to={HOME_ROUTE.path} replace />
        )
    }

    if(!tutor.id && !isCreate){
        return (
            <Navigate to={TUTORS_ROUTE.path} replace />
        )
    }

    return (
        <LayoutPages title={TUTOR_CREATE_ROUTE.name}>
            <TutorChange
                isCreate={isCreate}
                formError={formError}
                setFormError={setFormError}
                setErrorFieldDelete={setErrorFieldDelete}
                chooseSubject={
                    <ChooseItems 
                        error={formError.find(error => error.field === 'subject_id')?.text}
                        setError={setErrorFieldDelete('subject_id')}
                        title='Предмет'
                        selectedItems={[tutor.subject_id]}
                        setItem={setSubjectId}
                        getData={subjectService.getAll}
                    />
                }
                chooseTutor={
                    <ChooseItems
                        title=''
                        selectedItems={[tutor.tg_admin_username_id]}
                        setItem={setTgAdminUsernameId}
                        getData={getAdmins}
                        error={
                            formError.find(error => error.field === 'tg_admin_username')?.text
                                ||
                            formError.find(error => error.field === 'tg_admin_username_id')?.text
                        }
                        setError={() => {
                            setErrorFieldDelete('tg_admin_username_id')()
                            setErrorFieldDelete('tg_admin_username')()
                        }}
                    />
                }
            >
            </TutorChange>
        </LayoutPages>
    )
}

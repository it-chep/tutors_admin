import { useEffect, useState } from 'react'
import { HOME_ROUTE, TUTOR_CREATE_ROUTE } from '../../app/router/routes'
import { TutorChange } from '../../features/tutorChange'
import { LayoutPages } from '../layoutPages'
import { ITutorCreate, ITutorUpdate, tutorChange, tutorService } from '../../entities/tutor'
import { ChooseItems } from '../../features/chooseItems'
import { subjectService } from '../../entities/subject'
import { TRole } from '../../entities/my'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import { useAppSelector } from '../../app/store/store'
import { adminService } from '../../entities/admin'
import { IFormError } from '../../shared/model/types'
import { changeFormError } from '../../shared/lib/helpers/ChangeFormError'
import { LoaderSpinner } from '../../shared/ui/spinner'
import { useGlobalMessageActions } from '../../entities/globalMessage'

const roles: TRole[] = ['super_admin', 'admin', 'assistant']

export default function TutorChangePage() {

    const {pathname} = useLocation()
    const {id} = useParams()

    const isCreate = pathname === TUTOR_CREATE_ROUTE.path

    const [tutor, setTutor] = useState<ITutorCreate>({
        full_name: '',
        cost_per_hour: '',
        phone: '',
        tg: '',
        subject_id: -1,
        email: '',
        admin_id: -1,
        tg_admin_username: '',
    })

    const [tutorUpdateData, setTutorUpdateData] = useState<ITutorUpdate>({
        full_name: '',
        phone: '',
        tg: '',
        cost_per_hour: '',
        subject_id: 0,
        tg_admin_username: '',
    })

    const [isLoadingTutor, setIsLoadingTutor] = useState<boolean>(!isCreate)

    const {setSubjectId, setAdminId} = tutorChange(tutor, setTutor)
    const {setGlobalMessage} = useGlobalMessageActions()

    const {my} = useAppSelector(s => s.myReducer)
    const isAccess = roles.includes(my.role)

    const [formError, setFormError] = useState<IFormError<ITutorCreate>[]>([])
    const setErrorFieldDelete = changeFormError(formError, setFormError)

    useEffect(() => {
        if(!isCreate && id){
            setIsLoadingTutor(true)
            tutorService.get(+id)
                .then(res => {
                    setTutorUpdateData({
                        full_name: res.full_name,
                        phone: res.phone,
                        tg: res.tg,
                        cost_per_hour: res.cost_per_hour,
                        subject_id: res.subject_id ?? 0,
                        tg_admin_username: res.tg_admin_username ?? '',
                    })
                })
                .catch(() => setGlobalMessage({type: 'error', message: 'Ошибка при загрузке данных репетитора'}))
                .finally(() => setIsLoadingTutor(false))
        }
    }, [id])

    if(!isAccess){
        return (
            <Navigate to={HOME_ROUTE.path} replace />
        )
    }

    const getAdmins = async() => {
        const admins = await adminService.getAll()
        return admins.map(admin => ({name: admin.full_name, id: admin.id}))
    }

    if(isLoadingTutor){
        return (
            <LayoutPages title={TUTOR_CREATE_ROUTE.name}>
                <section className="loader"><LoaderSpinner /></section>
            </LayoutPages>
        )
    }

    return (
        <LayoutPages title={TUTOR_CREATE_ROUTE.name}>
            <TutorChange
                formError={formError}
                setFormError={setFormError}
                setErrorFieldDelete={setErrorFieldDelete}
                tutor={isCreate ? tutor : undefined}
                setTutor={isCreate ? setTutor : undefined}
                tutorUpdate={!isCreate ? tutorUpdateData : undefined}
                setTutorUpdate={!isCreate ? setTutorUpdateData : undefined}
                tutorId={id ? +id : undefined}
                isCreate={isCreate}
            >
                {
                    isCreate
                        ?
                    <>
                        <ChooseItems
                            title='Предмет'
                            selectedItems={[tutor.subject_id]}
                            setItem={setSubjectId}
                            getData={subjectService.getAll}
                            error={formError.find(error => error.field === 'subject_id')?.text}
                            setError={setErrorFieldDelete('subject_id')}
                        />
                        {
                            my.role === 'super_admin'
                                &&
                            <ChooseItems
                                title='Админ'
                                selectedItems={[tutor.admin_id]}
                                setItem={setAdminId}
                                getData={getAdmins}
                                error={formError.find(error => error.field === 'admin_id')?.text}
                                setError={setErrorFieldDelete('admin_id')}
                            />
                        }
                    </>
                        :
                    <ChooseItems
                        title='Предмет'
                        selectedItems={[tutorUpdateData.subject_id]}
                        setItem={(subject_id: number) => setTutorUpdateData(prev => ({...prev, subject_id}))}
                        getData={subjectService.getAll}
                    />
                }
            </TutorChange>
        </LayoutPages>
    )
}

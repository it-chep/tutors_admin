import { useState } from 'react'
import { TUTOR_CREATE_ROUTE } from '../../app/router/routes'
import { TutorChange } from '../../features/tutorChange'
import { LayoutPages } from '../layoutPages'
import { ITutorCreate, tutorChange } from '../../entities/tutor'
import { ChooseItems } from '../../features/chooseSubject'
import { subjectService } from '../../entities/subject'


export default function TutorChangePage() {

    const [tutor, setTutor] = useState<ITutorCreate>({
        full_name: '',
        cost_per_hour: '',
        phone: '',
        tg: '',
        subject_id: -1,
    })

    const {setSubjectId} = tutorChange(tutor, setTutor)

    return (
        <LayoutPages title={TUTOR_CREATE_ROUTE.name}>
            <TutorChange 
                tutor={tutor}
                setTutor={setTutor}
            >
                <ChooseItems 
                    title='Предмет'
                    selectedItems={[tutor.subject_id]}
                    setItem={setSubjectId}
                    getData={subjectService.getAll}
                />
            </TutorChange>
        </LayoutPages>
    )
}
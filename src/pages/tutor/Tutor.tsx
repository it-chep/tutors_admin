import { Navigate, useParams } from 'react-router-dom'
import { HOME_ROUTE, TUTOR_ROUTE } from '../../app/router/routes'
import { studentService } from '../../entities/student'
import { StudentsWidget } from '../../widgets/students'
import { TutorWidget } from '../../widgets/tutor'
import { LayoutPages } from '../layoutPages'
import { useAppSelector } from '../../app/store/store'
import { TRole } from '../../entities/my'
import { TutorLessons } from '../../widgets/tutorLessons'
import { GPHAgreement } from '../../widgets/gphAgreement'
import { TutorAccrual } from '../../widgets/tutorAccrual'
import classes from './tutor.module.scss'
import { useState } from 'react'
import { TutorPenaltyBonus } from '../../widgets/tutorPenaltyBonus'

const roles: TRole[] = ['super_admin', 'admin', 'assistant'] 

export default function TutorPage() {

    const {id} = useParams<{id: string}>()
    const [isStudentsMove, setIsStudentsMove] = useState<boolean>(false)
    const {my} = useAppSelector(s => s.myReducer)
    const isAccess = roles.includes(my.role)
    
    if(!isAccess){
        return (
            <Navigate to={HOME_ROUTE.path} replace />
        )
    }

    return (
        id
            ?
        <LayoutPages title={TUTOR_ROUTE.name}>
            <TutorWidget 
                id={+id} 
                isStudentsMove={isStudentsMove}
                setIsStudentsMove={setIsStudentsMove}
            />
            <section className={classes.widget}>
                <TutorAccrual 
                    tutorId={+id} 
                />
            </section>
            <section className={classes.widget}>
                <TutorLessons 
                    isOpen
                    tutorId={+id}
                />
            </section>
            {
                ((my.role === 'admin') || ((my.role === 'assistant') && my.paid_functions['gph']))
                    &&
                <section className={classes.widget}>
                    <GPHAgreement tutorId={+id} />
                </section>
            }
            <section className={classes.widget}>
                <TutorPenaltyBonus 
                    tutorId={+id}
                />
            </section>
            <section className={classes.widget + " " + classes.students}>
                <section className={classes.title}>Студенты</section>
                {
                    isStudentsMove
                        ?
                    <span>Студенты были перемещены к другому репетитору</span>
                        :
                    <StudentsWidget 
                        request={() => studentService.getAllByTutor(+id)}
                    />        
                }
            </section>  
        </LayoutPages>
            :
        <></>
    )
}
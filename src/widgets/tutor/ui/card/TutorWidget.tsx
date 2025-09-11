import { FC, PropsWithChildren, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import classes from './tutorWidget.module.scss'
import { ITutorData } from "../../../../entities/tutor/model/types";
import { useMyActions } from "../../../../entities/my";
import { useGlobalMessageActions } from "../../../../entities/globalMessage";
import { TutorCard, tutorService } from "../../../../entities/tutor";
import { AuthError } from "../../../../shared/lib/helpers/AuthError";
import { TutorCalendar } from "../calendar/TutorCalendar";
import { TutorStudents } from "../students/TutorStudents";
import { DeleteAction } from "../../../../features/deleteAction";
import { TUTORS_ROUTE } from "../../../../app/router/routes";

interface IProps {
    id: number;
}

export const TutorWidget: FC<IProps & PropsWithChildren> = ({id, children}) => {

    const [isLoaing, setIsLoading] = useState<boolean>(true)
    const [tutor, setTutor] = useState<ITutorData>()

    const {setIsAuth} = useMyActions()
    const {setGlobalMessage} = useGlobalMessageActions()

    const router = useNavigate()

    const getData = async () => {
        try{
            if(id){
                setIsLoading(true)
                const tutorRes = await tutorService.get(+id)
                setTutor(tutorRes)
            }
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: 'Ошибка при получении данных о репетиторе', type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const onDelete = async () => {
        if(tutor){
            await tutorService.delete(tutor.id)
            router(TUTORS_ROUTE.path)
        }
    }

    return (
        <section className={classes.container}>   
            {
                isLoaing
                    ?
                <section></section>
                    :
                tutor
                    &&
                <>
                    <section className={classes.delete}>
                        <DeleteAction
                            successText="Репетитор удален"        
                            errorText="Ошибка при удалении репетитора"
                            onDelete={onDelete}
                            questionText="Точно хотите удалить Репетитора ?"
                        />
                    </section>
                    <TutorCard
                        tutor={tutor}
                    >
                        <TutorCalendar id={tutor.id} />
                    </TutorCard>
                    <TutorStudents>
                        {children}
                    </TutorStudents>
                </>
            }
        </section>
    )
}
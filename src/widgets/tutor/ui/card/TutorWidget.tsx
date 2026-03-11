import React, { FC, PropsWithChildren, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from './tutorWidget.module.scss'
import { useMyActions } from "../../../../entities/my";
import { useGlobalMessageActions } from "../../../../entities/globalMessage";
import { useGlobalLoadingActions } from "../../../../entities/globalLoading";
import { ITutor, ITutorChange, ITutorData, TutorCard, tutorService, useTutorActions } from "../../../../entities/tutor";
import { AuthError } from "../../../../shared/lib/helpers/AuthError";
import { TutorCalendar } from "../calendar/TutorCalendar";
import { TutorStudents } from "../students/TutorStudents";
import { DeleteAction } from "../../../../features/deleteAction";
import { TUTORS_ROUTE, TUTOR_UPDATE_ROUTE } from "../../../../app/router/routes";
import { StudentsMove } from "../../../../features/studentsMove";
import { Modal } from "../../../../shared/ui/modal";
import { ConfirmationAction } from "../../../../shared/ui/confirmationAction";
import editImg from '../../../../shared/lib/assets/edit.png';
import folderPlus from '../../../student/lib/assets/folderPlus.png';
import folderMinus from '../../../student/lib/assets/folderMinus.png';

interface IProps {
    id: number;
    tutorLessons?: React.ReactNode;
}

export const TutorWidget: FC<IProps & PropsWithChildren> = ({id, tutorLessons, children}) => {

    const [isLoaing, setIsLoading] = useState<boolean>(true)
    const [tutor, setTutor] = useState<ITutorData>()
    const [newTutor, setNewTutor] = useState<ITutor>()
    const {setIsAuth} = useMyActions()
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setTutor: setTutorChange} = useTutorActions()
    const [isStudentsMove, setIsStudentsMove] = useState<boolean>(false)
    const [archiveOpen, setArchiveOpen] = useState<boolean>(false)
    const {setIsLoading: setIsLoadingGlobal} = useGlobalLoadingActions()

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

    const onArchiveToggle = async () => {
        if(!tutor) return
        try{
            setIsLoadingGlobal(true)
            if(tutor.is_archive){
                await tutorService.unarchive(tutor.id)
                setTutor({...tutor, is_archive: false})
            } else {
                await tutorService.archive(tutor.id)
                setTutor({...tutor, is_archive: true})
            }
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: 'Ошибка при архивировании или разархивировании репетитора', type: 'error'})
            }
        }
        finally{
            setIsLoadingGlobal(false)
            setArchiveOpen(false)
        }
    }

    const onMove = (tutor: ITutor) => {
        setNewTutor(tutor)
        setIsStudentsMove(true)
    }

    const onEdit = () => {
        if(tutor){
            const tutorChange: ITutorChange = {
                id: tutor?.id,
                subject_id: tutor.subject_id,
                email: tutor.email,
                tg: tutor.tg,
                tg_admin_username: tutor.tg_admin_username || '',
                tg_admin_username_id: tutor.tg_admin_username_id || -1,
                full_name: tutor.full_name,
                cost_per_hour: tutor.cost_per_hour,
                phone: tutor.phone,
            }
            setTutorChange(tutorChange)
            router(TUTOR_UPDATE_ROUTE.path)
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
                        <section
                            className={classes.archive}
                            onClick={() => setArchiveOpen(true)}
                        >
                            {
                                tutor.is_archive
                                    ?
                                <>
                                    <img src={folderMinus} />
                                    Разархивировать<br/> репетитора
                                </>
                                    :
                                <>
                                    <img src={folderPlus} />
                                    Архивировать<br/> репетитора
                                </>
                            }
                        </section>
                        <img
                            className={classes.edit}
                            src={editImg}
                            alt="Редактирование"
                            onClick={onEdit}
                        />
                        <DeleteAction
                            successText="Репетитор удален"
                            errorText="Ошибка при удалении репетитора"
                            onDelete={onDelete}
                            questionText="Точно хотите удалить Репетитора ?"
                        />
                        <Modal setOpen={setArchiveOpen} open={archiveOpen}>
                            <ConfirmationAction
                                onClick={onArchiveToggle}
                                setOpen={setArchiveOpen}
                                title={`Вы точно хотите ${tutor.is_archive ? 'разархивировать' : 'архивировать'} репетитора ?`}
                                type='send'
                            />
                        </Modal>
                    </section>
                    <TutorCard
                        tutor={tutor}
                    >
                        <TutorCalendar id={tutor.id} />
                    </TutorCard>
                    {
                        !isStudentsMove
                            &&
                        <section className={classes.move}>
                            <StudentsMove
                                title="Перенести студентов к новому репетитору" 
                                tutorId={tutor.id}
                                onSelected={onMove}
                                />
                        </section>
                    }
                    {
                        tutorLessons
                            &&
                        <section className={classes.tutorLessons}>
                            {tutorLessons}
                        </section>
                    }
                    <TutorStudents>
                        {
                            isStudentsMove
                                ?
                            <span>Студенты были перемещены к репетитору: {newTutor?.full_name}</span>
                                :
                            children
                        }
                    </TutorStudents>
                </>
            }
        </section>
    )
}
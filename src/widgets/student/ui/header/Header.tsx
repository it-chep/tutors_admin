import React, { FC, useState } from "react";
import { DeleteAction } from "../../../../features/deleteAction";
import { Message } from "../message/Message";
import classes from './header.module.scss'
import { useNavigate } from "react-router-dom";
import { STUDENT_UPDATE_ROUTE, STUDENTS_ROUTE } from "../../../../app/router/routes";
import { IStudentData, studentService, useStudentActions } from "../../../../entities/student";
import editImg from '../../../../shared/lib/assets/edit.png'
import { NotificationPush } from "../../../../features/notificationPush";
import { useAppSelector } from "../../../../app/store/store";
import { AuthError } from "../../../../shared/err/AuthError";
import { useGlobalLoadingActions } from "../../../../entities/globalLoading";
import { useGlobalMessageActions } from "../../../../entities/globalMessage";
import { useMyActions } from "../../../../entities/my";
import folderMinus from '../../lib/assets/folderMinus.png'
import folderPlus from '../../lib/assets/folderPlus.png'
import { Modal } from "../../../../shared/ui/modal";
import { ConfirmationAction } from "../../../../shared/ui/confirmationAction";

interface IProps {
    student: IStudentData;
    setStudent: React.Dispatch<React.SetStateAction<IStudentData | undefined>>
}

export const Header: FC<IProps> = ({student, setStudent}) => {

    const router = useNavigate()
    const {setIsLoading} = useGlobalLoadingActions()
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useMyActions()
    const {my} = useAppSelector(s => s.myReducer)
    const [open, setOpen] = useState<boolean>(false)

    const onDelete = async () => {
        if(student.id){
            await studentService.delete(student.id)
            router(STUDENTS_ROUTE.path)
        }
    }

    const onEdit = () => {
        setStudent(student)
        router(STUDENT_UPDATE_ROUTE.path)
    }

    const onArchive = async () => {
        try{
            setIsLoading(true)
            if(student.is_archive){
                await studentService.unarchive(student.id)
                setStudent(student => ({...student, is_archive: false}) as IStudentData)
            }
            else{
                await studentService.archive(student.id)
                setStudent(student => ({...student, is_archive: true}) as IStudentData)
            }
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: 'Ошибка при архивировании или разархивировании студента', type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
            setOpen(false)
        }
    }

    return (
        <section className={classes.header}>
            <section className={classes.warnings}>
                {
                    student.is_balance_negative
                        &&
                    <Message 
                        type="balanceNegative"
                        sign="У родителя есть задолженность"
                    />
                }
                {
                    student.is_only_trial_finished
                        &&
                    <Message 
                        type="onlyTrial"
                        sign="Проведено только пробное занятие"
                    />
                }
                {
                    student.is_newbie
                        &&
                    <Message
                        type="newbie"
                        sign="Новичок"
                    />
                }
            </section>
            <section className={classes.features}>
                {
                    (my.role === 'admin' || my.role === 'assistant') && my.paid_functions['student_archive']
                        &&
                    <>
                        <section  
                            className={classes.archive}
                            onClick={() => setOpen(!open)}
                        >
                            {
                                student.is_archive 
                                    ?
                                <>
                                    <img src={folderMinus} />
                                    Разархивировать<br/> студента
                                </>
                                    :
                                <>
                                    <img src={folderPlus} />
                                    Архивировать<br/> студента
                                </>
                            }
                        </section>
                        <Modal setOpen={setOpen} open={open}>
                            <ConfirmationAction 
                                onClick={onArchive}
                                setOpen={setOpen} 
                                title={`Вы точно хотите ${student.is_archive ? 'разархивировать' : 'архивировать'} студента ?`}
                                type='send'
                            />
                        </Modal>
                    </>
                }
                {
                    (student.tg_id && student.balance[0] === '-') || true
                        ?
                    <NotificationPush studentId={student.id} />
                        :
                    <></>
                }
                <img  
                    onClick={onEdit}
                    className={classes.edit}
                    src={editImg} 
                    alt="Редактирование" 
                />
                <DeleteAction
                    successText="Студент удален"        
                    errorText="Ошибка при удалении студента"
                    onDelete={onDelete}
                    questionText="Точно хотите удалить Студента ?"
                />
            </section>
        </section>
    )
}
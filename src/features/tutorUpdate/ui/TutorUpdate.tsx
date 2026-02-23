import { FC, useEffect, useState } from "react";
import classes from './tutorUpdate.module.scss'
import editImg from '../../../shared/lib/assets/edit.png'
import { Modal } from "../../../shared/ui/modal";
import { MyInput } from "../../../shared/ui/input";
import { MyButton } from "../../../shared/ui/button";
import { useGlobalLoadingActions } from "../../../entities/globalLoading";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { AuthError } from "../../../shared/lib/helpers/AuthError";
import { useMyActions } from "../../../entities/my";
import { ITutorData, ITutorUpdate, tutorService } from "../../../entities/tutor";
import { ConfirmationAction } from "../../../shared/ui/confirmationAction";
import { subjectService } from "../../../entities/subject";
import { ISubject } from "../../../entities/subject/model/types";
import { DropDownListSelected } from "../../../shared/ui/dropDownSelected";
import { IItem } from "../../../shared/model/types";

interface IProps {
    tutor: ITutorData;
    onUpdated: (updated: ITutorData) => void;
}

export const TutorUpdate: FC<IProps> = ({tutor, onUpdated}) => {

    const [open, setOpen] = useState<boolean>(false)
    const [confirm, setConfirm] = useState<boolean>(false)
    const [subjects, setSubjects] = useState<ISubject[]>([])
    const [isLoadingSubjects, setIsLoadingSubjects] = useState<boolean>(true)
    const [form, setForm] = useState<ITutorUpdate>({
        full_name: tutor.full_name,
        phone: tutor.phone,
        tg: tutor.tg,
        cost_per_hour: tutor.cost_per_hour,
        subject_id: tutor.subject_id ?? 0,
        tg_admin_username: tutor.tg_admin_username ?? '',
    })
    const {setIsLoading} = useGlobalLoadingActions()
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useMyActions()

    useEffect(() => {
        subjectService.getAll()
            .then(res => setSubjects(res))
            .catch(() => {})
            .finally(() => setIsLoadingSubjects(false))
    }, [])

    const onClose = (open: boolean) => {
        if(!open){
            setConfirm(false)
            setForm({
                full_name: tutor.full_name,
                phone: tutor.phone,
                tg: tutor.tg,
                cost_per_hour: tutor.cost_per_hour,
                subject_id: tutor.subject_id ?? 0,
                tg_admin_username: tutor.tg_admin_username ?? '',
            })
        }
        setOpen(open)
    }

    const onSubjectSelected = (item: IItem) => {
        return (selected: boolean) => {
            if(selected){
                setForm(f => ({...f, subject_id: item.id}))
            }
        }
    }

    const onSend = async () => {
        try{
            setOpen(false)
            setConfirm(false)
            setIsLoading(true)
            await tutorService.update(tutor.id, form)
            const updatedSubject = subjects.find(s => s.id === form.subject_id)
            onUpdated({
                ...tutor,
                ...form,
                subject_name: updatedSubject?.name ?? tutor.subject_name,
            })
            setGlobalMessage({type: 'ok', message: 'Репетитор успешно обновлён'})
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({type: 'error', message: 'Ошибка при обновлении репетитора'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    return (
        <section className={classes.container}>
            <img src={editImg} onClick={() => setOpen(true)} style={{cursor: 'pointer'}} />
            <Modal open={open} setOpen={onClose}>
                {
                    confirm
                        ?
                    <ConfirmationAction
                        title="Сохранить изменения репетитора?"
                        setOpen={onClose}
                        onClick={onSend}
                        type="send"
                    />
                        :
                    <section className={classes.form}>
                        <section className={classes.title}>Редактирование репетитора</section>
                        <MyInput
                            title="ФИО"
                            value={form.full_name}
                            setValue={v => setForm(f => ({...f, full_name: v}))}
                        />
                        <MyInput
                            title="Телефон"
                            value={form.phone}
                            setValue={v => setForm(f => ({...f, phone: v}))}
                        />
                        <MyInput
                            title="Телеграм"
                            value={form.tg}
                            setValue={v => setForm(f => ({...f, tg: v}))}
                        />
                        <MyInput
                            title="Ставка в час"
                            value={form.cost_per_hour}
                            setValue={v => setForm(f => ({...f, cost_per_hour: v}))}
                        />
                        <MyInput
                            title="Рабочий аккаунт тг (tg_admin_username)"
                            value={form.tg_admin_username}
                            setValue={v => setForm(f => ({...f, tg_admin_username: v}))}
                        />
                        <DropDownListSelected
                            items={subjects.map(s => ({id: s.id, name: s.name}))}
                            selectedIdItems={form.subject_id ? [form.subject_id] : []}
                            onSelected={onSubjectSelected}
                            isLoading={isLoadingSubjects}
                            oneChoice
                        />
                        <MyButton onClick={() => setConfirm(true)}>Сохранить</MyButton>
                    </section>
                }
            </Modal>
        </section>
    )
}

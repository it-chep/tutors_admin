import { FC, PropsWithChildren, useEffect, useState } from "react";
import classes from './tutorChange.module.scss'
import { MyInput } from "../../../../shared/ui/input";
import { ITutorCreate, ITutorUpdate, tutorChange, tutorService } from "../../../../entities/tutor";
import { useGlobalLoadingActions } from "../../../../entities/globalLoading";
import { useGlobalMessageActions } from "../../../../entities/globalMessage";
import { useMyActions } from "../../../../entities/my";
import { AuthError } from "../../../../shared/lib/helpers/AuthError";
import { MyButton } from "../../../../shared/ui/button";
import { useNavigate } from "react-router-dom";
import { TUTORS_ROUTE, TUTOR_ROUTE } from "../../../../app/router/routes";
import { IFormError, IItem } from "../../../../shared/model/types";
import { useAppSelector } from "../../../../app/store/store";
import { studentService } from "../../../../entities/student";
import { DropDownListSelected } from "../../../../shared/ui/dropDownSelected";

interface IProps {
    tutor?: ITutorCreate;
    setTutor?: (tutor: ITutorCreate) => void;
    tutorUpdate?: ITutorUpdate;
    setTutorUpdate?: (tutor: ITutorUpdate) => void;
    tutorId?: number;
    isCreate: boolean;
    formError: IFormError<ITutorCreate>[];
    setFormError: (formError: IFormError<ITutorCreate>[]) => void;
    setErrorFieldDelete: (field: keyof ITutorCreate) => () => void;
}

export const TutorChange: FC<IProps & PropsWithChildren> = ({
    tutor, setTutor, tutorUpdate, setTutorUpdate, tutorId,
    isCreate, children, formError, setErrorFieldDelete, setFormError
}) => {

    const {setIsLoading} = useGlobalLoadingActions()
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useMyActions()
    const {my} = useAppSelector(s => s.myReducer)

    const createSetters = tutor && setTutor ? tutorChange(tutor, setTutor) : null

    const router = useNavigate()

    const [tgAdminItems, setTgAdminItems] = useState<IItem[]>([])
    const [isLoadingTgAdmins, setIsLoadingTgAdmins] = useState<boolean>(true)
    const [selectedTgAdminIds, setSelectedTgAdminIds] = useState<number[]>([])

    const currentTgAdmin = isCreate ? tutor?.tg_admin_username : tutorUpdate?.tg_admin_username

    useEffect(() => {
        studentService.getTgAdmins()
            .then(items => {
                setTgAdminItems(items)
                if(currentTgAdmin){
                    const found = items.find(item => item.name === currentTgAdmin)
                    if(found) setSelectedTgAdminIds([found.id])
                }
            })
            .catch(() => {})
            .finally(() => setIsLoadingTgAdmins(false))
    }, [])

    const onTgAdminSelected = (item: IItem) => {
        return (selected: boolean) => {
            const username = selected ? item.name : ''
            setSelectedTgAdminIds(selected ? [item.id] : [])
            if(isCreate && setTutor && tutor){
                setTutor({...tutor, tg_admin_username: username})
            } else if(setTutorUpdate && tutorUpdate){
                setTutorUpdate({...tutorUpdate, tg_admin_username: username})
            }
        }
    }

    const onTgAdminInput = (value: string) => {
        const found = tgAdminItems.find(item => item.name === value)
        setSelectedTgAdminIds(found ? [found.id] : [])
        if(isCreate && setTutor && tutor){
            setTutor({...tutor, tg_admin_username: value})
        } else if(setTutorUpdate && tutorUpdate){
            setTutorUpdate({...tutorUpdate, tg_admin_username: value})
        }
    }

    const checkCreateData = (): boolean => {
        if(!tutor) return false
        const error: IFormError<ITutorCreate>[] = [];
        let isOk = true;
        for(let key in tutor){
            if(tutor[key as keyof ITutorCreate] === '' || (
                (tutor[key as keyof ITutorCreate] === -1) && !((key as keyof ITutorCreate === 'admin_id') && (my.role !== 'super_admin')))
            ){
                error.push({field: key as keyof ITutorCreate, text: 'Обязательное поле'})
                isOk = false;
            }
        }
        setFormError(error)
        return isOk
    }

    const onCreate = async () => {
        if(!tutor || !checkCreateData()) return
        try{
            setIsLoading(true)
            await tutorService.create(tutor)
            router(TUTORS_ROUTE.path)
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: 'Ошибка при создании репетитора', type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    const onUpdate = async () => {
        if(!tutorUpdate || !tutorId) return
        try{
            setIsLoading(true)
            await tutorService.update(tutorId, tutorUpdate)
            setGlobalMessage({type: 'ok', message: 'Репетитор успешно обновлён'})
            router(TUTOR_ROUTE.path.replace(':id', String(tutorId)))
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: 'Ошибка при обновлении репетитора', type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    const tgAdminField = (
        <section className={classes.tgAdmin}>
            <MyInput
                title="Рабочий аккаунт тг"
                value={currentTgAdmin ?? ''}
                setValue={onTgAdminInput}
                error={formError.find(error => error.field === 'tg_admin_username')?.text}
                setError={setErrorFieldDelete('tg_admin_username')}
                placeholder="Введите или выберите из списка"
            />
            <section className={classes.tgAdminDropdown}>
                <DropDownListSelected
                    items={tgAdminItems}
                    selectedIdItems={selectedTgAdminIds}
                    onSelected={onTgAdminSelected}
                    isLoading={isLoadingTgAdmins}
                    selectedCount
                />
            </section>
        </section>
    )

    if(isCreate && tutor && createSetters){
        return (
            <section className={classes.container}>
                <h1 className={classes.title}>Создание репетитора</h1>
                <MyInput
                    title="ФИО репетитора"
                    value={tutor.full_name}
                    setValue={createSetters.setFullName}
                    error={formError.find(error => error.field === 'full_name')?.text}
                    setError={setErrorFieldDelete('full_name')}
                />
                <MyInput
                    title="Email репетитора"
                    value={tutor.email}
                    setValue={createSetters.setEmail}
                    error={formError.find(error => error.field === 'email')?.text}
                    setError={setErrorFieldDelete('email')}
                />
                <MyInput
                    title="Ставка в час"
                    value={tutor.cost_per_hour}
                    setValue={createSetters.setCostPerHour}
                    error={formError.find(error => error.field === 'cost_per_hour')?.text}
                    setError={setErrorFieldDelete('cost_per_hour')}
                />
                <MyInput
                    title="Номер телефона репетитора"
                    value={tutor.phone}
                    setValue={createSetters.setPhone}
                    error={formError.find(error => error.field === 'phone')?.text}
                    setError={setErrorFieldDelete('phone')}
                />
                <MyInput
                    title="Телеграм репетитора"
                    value={tutor.tg}
                    setValue={createSetters.setTg}
                    error={formError.find(error => error.field === 'tg')?.text}
                    setError={setErrorFieldDelete('tg')}
                />
                {tgAdminField}
                {children}
                <section className={classes.button}>
                    <MyButton onClick={onCreate}>Создать</MyButton>
                </section>
            </section>
        )
    }

    if(!isCreate && tutorUpdate && setTutorUpdate){
        return (
            <section className={classes.container}>
                <h1 className={classes.title}>Редактирование репетитора</h1>
                <MyInput
                    title="ФИО"
                    value={tutorUpdate.full_name}
                    setValue={v => setTutorUpdate({...tutorUpdate, full_name: v})}
                />
                <MyInput
                    title="Телефон"
                    value={tutorUpdate.phone}
                    setValue={v => setTutorUpdate({...tutorUpdate, phone: v})}
                />
                <MyInput
                    title="Телеграм"
                    value={tutorUpdate.tg}
                    setValue={v => setTutorUpdate({...tutorUpdate, tg: v})}
                />
                <MyInput
                    title="Ставка в час"
                    value={tutorUpdate.cost_per_hour}
                    setValue={v => setTutorUpdate({...tutorUpdate, cost_per_hour: v})}
                />
                {tgAdminField}
                {children}
                <section className={classes.button}>
                    <MyButton onClick={onUpdate}>Сохранить</MyButton>
                </section>
            </section>
        )
    }

    return null
}

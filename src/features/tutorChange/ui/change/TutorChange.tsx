import { FC, PropsWithChildren, useState } from "react";
import classes from './tutorChange.module.scss'
import { MyInput } from "../../../../shared/ui/input";
import { useGlobalLoadingActions } from "../../../../entities/globalLoading";
import { useGlobalMessageActions } from "../../../../entities/globalMessage";
import { useMyActions } from "../../../../entities/my";
import { useNavigate } from "react-router-dom";
import { IFormError, IItem } from "../../../../shared/model/types";
import { useAppSelector } from "../../../../app/store/store";
import { ITutorChange, useTutorActions } from "../../../../entities/tutor";
import { Send } from "../send/Send";
import { SwitchButton } from "../../../../shared/ui/switchButton";

interface IProps {
    isCreate: boolean;
    chooseTutor: React.ReactNode;
    chooseSubject: React.ReactNode;
    formError: IFormError<ITutorChange>[];
    setFormError: (formError: IFormError<ITutorChange>[]) => void;
    setErrorFieldDelete: (field: keyof ITutorChange) => () => void;
}

export const TutorChange: FC<IProps & PropsWithChildren> = ({
    isCreate, chooseTutor, formError, setErrorFieldDelete, setFormError, chooseSubject
}) => {

    const [isTgAdminInput, setIsTgAdminInput] = useState<boolean>(false)

    const {tutor} = useAppSelector(s => s.tutorReducer)

    const {
        setFullName, setTgAdminUsernameId, setCostPerHour,
        setPhone, setEmail, setTg, setTgAdminUsername
    } = useTutorActions()

    const onSelected = (selected: 1 | 2) => {
        setIsTgAdminInput(selected === 2)
        if(selected === 2){
            setTgAdminUsernameId(-1)
        }
        else{
            setTgAdminUsername('')
        }
    }

    return (
        <section className={classes.container}>
            <h1 className={classes.title}>{isCreate ? 'Создание' : 'Обновление'} студента</h1>
            <MyInput 
                title="ФИО репетитора"
                value={tutor.full_name}
                setValue={setFullName}
                error={formError.find(error => error.field === 'full_name')?.text}
                setError={setErrorFieldDelete('full_name')}
            />
            <MyInput 
                title="Номер телефона репетитора"
                value={tutor.phone}
                setValue={setPhone}
                error={formError.find(error => error.field === 'phone')?.text}
                setError={setErrorFieldDelete('phone')}
            />
            <MyInput 
                title="TG репетитора"
                value={tutor.tg}
                setValue={setTg}
                error={formError.find(error => error.field === 'tg')?.text}
                setError={setErrorFieldDelete('tg')}
            />
            <MyInput 
                title="Email репетитора"
                value={tutor.email}
                setValue={setEmail}
                error={formError.find(error => error.field === 'email')?.text}
                setError={setErrorFieldDelete('email')}
            />
            <MyInput 
                title="Стоимость часа"
                value={tutor.cost_per_hour}
                setValue={setCostPerHour}
                error={formError.find(error => error.field === 'cost_per_hour')?.text}
                setError={setErrorFieldDelete('cost_per_hour')}
            />
            {chooseSubject}
            <section className={classes.tgAdmin}>
                <span className={classes.sign}>TG админа</span>
                <SwitchButton
                    text1="Выбрать"
                    text2="Новый"
                    selected={isTgAdminInput ? 2 : 1}
                    onSelected={onSelected}
                />
                <section className={classes.input}>
                {
                    !isTgAdminInput
                        ?
                    chooseTutor
                        :
                    <MyInput 
                        title=""
                        value={tutor.tg_admin_username}
                        setValue={setTgAdminUsername}
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
                </section>
            </section>
            <Send 
                formError={formError} 
                setFormError={setFormError}
                isCreate={isCreate} 
            />
        </section>
   )
}
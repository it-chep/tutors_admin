import { FC, PropsWithChildren, useState } from "react";
import classes from './tutorChange.module.scss'
import { MyInput } from "../../../../shared/ui/input";
import { ITutorCreate, tutorChange, tutorService } from "../../../../entities/tutor";
import { useGlobalLoadingActions } from "../../../../entities/globalLoading";
import { useGlobalMessageActions } from "../../../../entities/globalMessage";
import { useMyActions } from "../../../../entities/my";
import { AuthError } from "../../../../shared/lib/helpers/AuthError";
import { MyButton } from "../../../../shared/ui/button";
import { useNavigate } from "react-router-dom";
import { TUTORS_ROUTE } from "../../../../app/router/routes";

interface IProps {
    tutor: ITutorCreate;
    setTutor: (tutor: ITutorCreate) => void;
}

export const TutorChange: FC<IProps & PropsWithChildren> = ({tutor, setTutor, children}) => {

    const {setIsLoading} = useGlobalLoadingActions()
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useMyActions()

    const {setFullName, setCostPerHour, setPhone, setTg, setEmail} = tutorChange(tutor, setTutor)

    const router = useNavigate()

    const onSend = async () => {
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
                setGlobalMessage({message: `Ошибка при создании репетитора`, type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    return (
        <section className={classes.container}>
            <h1 className={classes.title}>Создание репетитора</h1>
            <MyInput 
                title="ФИО репетитора"
                value={tutor.full_name}
                setValue={setFullName}
            />
            <MyInput 
                title="Email репетитора"
                value={tutor.email}
                setValue={setEmail}
            />
            <MyInput 
                title="Ставка в час"
                value={tutor.cost_per_hour}
                setValue={setCostPerHour}
            />
            <MyInput 
                title="Номер телефона репетитора"
                value={tutor.phone}
                setValue={setPhone}
            />
            <MyInput 
                title="Телеграм репетитора"
                value={tutor.tg}
                setValue={setTg}
            />
            {children}
            <section className={classes.button}>
                <MyButton
                    onClick={onSend}
                >
                    Создать
                </MyButton>
            </section>
        </section>
    )
}
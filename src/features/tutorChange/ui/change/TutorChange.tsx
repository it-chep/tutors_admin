import { FC, useState } from "react";
import classes from './tutorChange.module.scss'
import { MyInput } from "../../../../shared/ui/input";
import { ITutorCreate, tutorChange, tutorService } from "../../../../entities/tutor";
import { useGlobalLoadingActions } from "../../../../entities/globalLoading";
import { useGlobalMessageActions } from "../../../../entities/globalMessage";
import { useMyActions } from "../../../../entities/my";
import { AuthError } from "../../../../shared/lib/helpers/AuthError";
import { MyButton } from "../../../../shared/ui/button";
import { List } from "../list/List";


export const TutorChange: FC = () => {

    const {setIsLoading} = useGlobalLoadingActions()
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useMyActions()
    const [tutor, setTutor] = useState<ITutorCreate>({
        full_name: '',
        cost_per_hour: '',
        phone: '',
        tg: '',
        subject_id: -1,
    })

    const {setFullName, setCostPerHour, setPhone, setTg, setSubjectId} = tutorChange(tutor, setTutor)

   const onSend = async () => {
        try{
            setIsLoading(true)
            await tutorService.create(tutor)
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
            <section>
                <section className={classes.subtitle}>Предмет</section>
                <List 
                    tutor={tutor}
                    setSubjectId={setSubjectId}
                />            
            </section>
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
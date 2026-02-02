import { FC, PropsWithChildren, useState } from "react";
import classes from './assistantChange.module.scss'
import { MyInput } from "../../../../shared/ui/input";
import { useGlobalLoadingActions } from "../../../../entities/globalLoading";
import { useGlobalMessageActions } from "../../../../entities/globalMessage";
import { useMyActions } from "../../../../entities/my";
import { AuthError } from "../../../../shared/lib/helpers/AuthError";
import { MyButton } from "../../../../shared/ui/button";
import { useNavigate } from "react-router-dom";
import { ADMINS_ROUTE } from "../../../../app/router/routes";
import { IFormError } from "../../../../shared/model/types";
import { changeFormError } from "../../../../shared/lib/helpers/ChangeFormError";
import { assistantChange, assistantService, IAssistantCreate } from "../../../../entities/assistant";

interface IProps {
    assistant: IAssistantCreate;
    setAssistant: (assistant: IAssistantCreate) => void;
}

export const AssistantChange: FC<IProps & PropsWithChildren> = ({assistant, setAssistant, children}) => {

    const {setIsLoading} = useGlobalLoadingActions()
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useMyActions()
    const [formError, setFormError] = useState<IFormError<IAssistantCreate>[]>([])
    const setErrorFieldDelete = changeFormError(formError, setFormError)

    const {setTg, setFullName, setPhone, setEmail} = assistantChange(assistant, setAssistant)

    const router = useNavigate()

    const checkData = (): boolean => {
        const error: IFormError<IAssistantCreate>[] = [];
        let isOk = true;
        for(let key in assistant){
            if(assistant[key as keyof IAssistantCreate] === ''){
                error.push({field: key as keyof IAssistantCreate, text: 'Обязательное поле'})
                isOk = false;
            }
        }
        setFormError(error)
        return isOk
    }

    const onSend = async () => {
        if(!checkData()){
            return
        }
        try{
            setIsLoading(true)
            await assistantService.create(assistant)
            router(ADMINS_ROUTE.path)
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: `Ошибка при создании ассистента`, type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    return (
        <section className={classes.container}>
            <h1 className={classes.title}>Создание ассистента</h1>
            <MyInput 
                title="ФИО ассистента"
                value={assistant.full_name}
                setValue={setFullName}
                error={formError.find(error => error.field === 'full_name')?.text}
                setError={setErrorFieldDelete('full_name')}
            />
            <MyInput 
                title="Email ассистента"
                value={assistant.email}
                setValue={setEmail}
                error={formError.find(error => error.field === 'email')?.text}
                setError={setErrorFieldDelete('email')}
            />
            <MyInput 
                title="Номер телефона ассистента"
                value={assistant.phone}
                setValue={setPhone}
                error={formError.find(error => error.field === 'phone')?.text}
                setError={setErrorFieldDelete('phone')}
            />
            <MyInput 
                title="Телеграм ассистента"
                value={assistant.tg}
                setValue={setTg}
                error={formError.find(error => error.field === 'tg')?.text}
                setError={setErrorFieldDelete('tg')}
            />
            <section>
                <section className={classes.sign}>
                    Доступные ТГ
                </section>
                {
                    children
                }
            </section>
            <section className={classes.button}>
                <MyButton
                    onClick={onSend}
                    error={formError.length > 0 ? "Заполните обязательные поля" : ""}
                >
                    Создать
                </MyButton>
            </section>
        </section>
    )
}
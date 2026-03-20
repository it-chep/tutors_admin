import { FC } from "react";
import { MyButton } from "../../../../shared/ui/button";
import classes from './send.module.scss'
import { useGlobalLoadingActions } from "../../../../entities/globalLoading";
import { useGlobalMessageActions } from "../../../../entities/globalMessage";
import { AuthError } from "../../../../shared/lib/helpers/AuthError";
import { useMyActions } from "../../../../entities/my";
import { useAppSelector } from "../../../../app/store/store";
import { useNavigate } from "react-router-dom";
import { TUTORS_ROUTE } from "../../../../app/router/routes";
import { IFormError } from "../../../../shared/model/types";
import { ITutorChange, tutorService, useTutorActions } from "../../../../entities/tutor";

interface IProps {
    isCreate: boolean;
    formError: IFormError<ITutorChange>[];
    setFormError: (formError: IFormError<ITutorChange>[]) => void;
}

export const Send: FC<IProps> = ({isCreate, formError, setFormError}) => {

    const {setIsLoading} = useGlobalLoadingActions()
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useMyActions()
    const {tutor} = useAppSelector(s => s.tutorReducer)
    const {setInit} = useTutorActions()

    const router = useNavigate()

    const checkData = (): boolean => {
        const error: IFormError<ITutorChange>[] = [];
        let isOk = true;
        for(let key in tutor){
            if(key as keyof ITutorChange === 'tg_admin_username') {
                if(error.find(e => e.field === 'tg_admin_username_id')) continue // уже обработали ошибку
                if(tutor.tg_admin_username) continue
                if(tutor.tg_admin_username_id !== -1) continue
                error.push({field: key as keyof ITutorChange, text: 'Обязательное поле'})
                isOk = false;
                continue
            }
            if(key as keyof ITutorChange === 'tg_admin_username_id') {
                if(error.find(e => e.field === 'tg_admin_username')) continue // уже обработали ошибку
                if(tutor.tg_admin_username) continue
                if(tutor.tg_admin_username_id !== -1) continue
                error.push({field: key as keyof ITutorChange, text: 'Обязательное поле'})
                isOk = false;
                continue
            }
            if(tutor[key as keyof ITutorChange] === '' || tutor[key as keyof ITutorChange] === -1){
                error.push({field: key as keyof ITutorChange, text: 'Обязательное поле'})
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
            if(isCreate){
                await tutorService.create(tutor)
            }
            else{
                await tutorService.update(tutor)
            }
            setInit()
            router(TUTORS_ROUTE.path)
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: `Ошибка при ${isCreate ? 'создании' : 'обновлении'} репетитора`, type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    return (
        <section className={classes.button}>
            <MyButton 
                onClick={onSend}
                error={formError.length > 0 ? "Заполните обязательные поля" : ""}
            >
                {isCreate ? 'Создать' : 'Обновить'}
            </MyButton>
        </section>
    )
}
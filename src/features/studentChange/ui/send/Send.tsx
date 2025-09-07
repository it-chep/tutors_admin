import { FC } from "react";
import { MyButton } from "../../../../shared/ui/button";
import classes from './send.module.scss'
import { useGlobalLoadingActions } from "../../../../entities/globalLoading";
import { useGlobalMessageActions } from "../../../../entities/globalMessage";
import { AuthError } from "../../../../shared/lib/helpers/AuthError";
import { useMyActions } from "../../../../entities/my";
import { studentService } from "../../../../entities/student";
import { useAppSelector } from "../../../../app/store/store";

interface IProps {
    isCreate: boolean;
}

export const Send: FC<IProps> = ({isCreate}) => {

    const {setIsLoading} = useGlobalLoadingActions()
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useMyActions()
    const {student} = useAppSelector(s => s.studentReducer)

    const onSend = async () => {
        try{
            setIsLoading(true)
            if(isCreate){
                await studentService.create(student)
            }
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: `Ошибка при ${isCreate ? 'создании' : 'обновлении'} студента`, type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    return (
        <section className={classes.button}>
            <MyButton onClick={onSend}>
                {isCreate ? 'Создать' : 'Обновить'}
            </MyButton>
        </section>
    )
}
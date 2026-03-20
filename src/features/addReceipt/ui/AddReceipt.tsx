import { ChangeEvent, FC } from "react";
import classes from './addReceipt.module.scss'
import { useGlobalLoadingActions } from "../../../entities/globalLoading";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { tutorService } from "../../../entities/tutor";
import { AuthError } from "../../../shared/err/AuthError";
import { useMyActions } from "../../../entities/my";

interface IProps {
    accrualId: number;
    onSaveTrigger: () => void;
}

export const AddReceipt: FC<IProps> = ({accrualId, onSaveTrigger}) => {

    const {setIsLoading} = useGlobalLoadingActions()
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useMyActions()

    const onSave = async (formData: FormData) => {
        try{
            setIsLoading(true)
            formData.append('accrual_id', String(accrualId))
            await tutorService.receiptSave(formData)
            onSaveTrigger()
            setGlobalMessage({message: 'Успешная загрузка чека', type: 'ok'})
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: 'Ошибка при загрузке чека', type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    const loaded = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if(files){
            const file = files[0]
            if(file){
                const formData = new FormData()
                formData.append('receipt', file, file.name)
                onSave(formData)
            }
        }
    }

    return (
        <label className={classes.add}>
            <input onChange={loaded} type="file" accept=".pdf" />
            добавить чек
        </label>
    )
}
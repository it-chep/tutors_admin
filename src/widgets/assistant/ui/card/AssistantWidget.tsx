import { FC, PropsWithChildren, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from './assistantWidget.module.scss'
import { AssistantCard, assistantChange, assistantService, IAssistantData } from "../../../../entities/assistant";
import { useMyActions } from "../../../../entities/my";
import { useGlobalMessageActions } from "../../../../entities/globalMessage";
import { AuthError } from "../../../../shared/err/AuthError";
import { ASSISTANTS_ROUTE } from "../../../../app/router/routes";
import { DeleteAction } from "../../../../features/deleteAction";
import { AssistantChangeTgAdmins } from "../../../../features/assistantChangeTgAdmins";

interface IProps {
    id: number;
}

export const AssistantWidget: FC<IProps & PropsWithChildren> = ({id, children}) => {

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [assistant, setAssistant] = useState<IAssistantData>()

    const {setIsAuth} = useMyActions()
    const {setGlobalMessage} = useGlobalMessageActions()

    const router = useNavigate()

    const getData = async () => {
        try{
            if(id){
                setIsLoading(true)
                const assistantRes = await assistantService.get(id)
                setAssistant(assistantRes)
            }
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: 'Ошибка при получении данных о ассистенте', type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const onDelete = async () => {
        if(assistant){
            await assistantService.delete(assistant.id)
            router(ASSISTANTS_ROUTE.path)
        }
    }

    return (
        <section className={classes.container}>   
            {
                isLoading
                    ?
                <section></section>
                    :
                assistant
                    &&
                <>
                    <section className={classes.delete}>
                        <DeleteAction
                            successText="Ассистент удален"        
                            errorText="Ошибка при удалении ассистента"
                            onDelete={onDelete}
                            questionText="Точно хотите удалить ассистента ?"
                        />
                    </section>
                    <AssistantCard
                        assistant={assistant}
                    />
                    <AssistantChangeTgAdmins 
                        assistant={assistant}
                        setAssistant={setAssistant}
                    />
                </>
            }
        </section>
    )
}
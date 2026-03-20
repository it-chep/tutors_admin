import { FC, PropsWithChildren, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from './assistantWidget.module.scss'
import { AssistantCard, assistantService, IAssistantData } from "../../../../entities/assistant";
import { useMyActions } from "../../../../entities/my";
import { useGlobalMessageActions } from "../../../../entities/globalMessage";
import { AuthError } from "../../../../shared/err/AuthError";
import { ASSISTANTS_ROUTE } from "../../../../app/router/routes";
import { DeleteAction } from "../../../../features/deleteAction";
import { AssistantChangeTgAdmins } from "../../../../features/assistantChangeTgAdmins";
import { ChangeActiveGPHAssistant } from "../../../../features/changeActiveGPHAssistant";
import { AssistantPermissions } from "../../../../features/assistantPermissions";
import { LoaderSpinner } from "../../../../shared/ui/spinner";

interface IProps {
    isAdmin: boolean;
    assistantId: number;
}

export const AssistantWidget: FC<IProps & PropsWithChildren> = ({assistantId, isAdmin, children}) => {

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [assistant, setAssistant] = useState<IAssistantData>({
        id: -1,
        full_name: '',
        phone: '',
        tg: '',
        tg_admins_usernames: [],
        can_view_contracts: false,
        can_penalize_assistants: [],
    })

    const {setIsAuth} = useMyActions()
    const {setGlobalMessage} = useGlobalMessageActions()

    const router = useNavigate()

    const getData = async () => {
        try{
            if(assistantId){
                setIsLoading(true)
                const assistantRes = await assistantService.get(assistantId)
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

    const setCanViewContracts = useCallback((can_view_contracts: boolean) => {
        setAssistant(assistant => ({...assistant, can_view_contracts}))
    }, [])

    const setPermissionsIds = useCallback((ids: number[]) => {
        setAssistant(assistant => ({
            ...assistant,
            can_penalize_assistants: ids,
        }))
    }, [])

    return (
        <section className={classes.container}>   
            {
                isLoading
                    ?
                <section className={classes.loader}><LoaderSpinner /></section>
                    :
                <>
                {
                    isAdmin
                        &&
                    <section className={classes.delete}>
                        <DeleteAction
                            successText="Ассистент удален"        
                            errorText="Ошибка при удалении ассистента"
                            onDelete={onDelete}
                            questionText="Точно хотите удалить ассистента ?"
                        />
                    </section>
                }
                <AssistantCard
                    assistant={assistant}
                    isAdmin={isAdmin}
                />
                {
                    isAdmin
                        &&
                    <>
                        <section className={classes.widget}>
                            <AssistantChangeTgAdmins 
                                assistant={assistant}
                                setAssistant={setAssistant}
                            />                            </section>
                        <section className={classes.widget}>
                            <ChangeActiveGPHAssistant
                                assistantId={assistant.id}
                                isActive={assistant.can_view_contracts}
                                setIsActive={setCanViewContracts}
                            />
                        </section>
                        <section className={classes.widget}>
                            <AssistantPermissions 
                                assistantId={assistantId}
                                permissionsIds={assistant.can_penalize_assistants}
                                setPermissionsIds={setPermissionsIds}
                            />
                        </section>
                    </>
                }
                </>
            }
        </section>
    )
}
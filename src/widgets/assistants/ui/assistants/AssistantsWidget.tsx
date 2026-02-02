import { FC, useEffect, useState } from "react";
import classes from './assistantsWidget.module.scss'
import { MyButton } from "../../../../shared/ui/button";
import { LoaderSpinner } from "../../../../shared/ui/spinner";
import { AuthError } from "../../../../shared/lib/helpers/AuthError";
import { useMyActions } from "../../../../entities/my";
import { useGlobalMessageActions } from "../../../../entities/globalMessage";
import { useNavigate } from "react-router-dom";
import { ASSISTANT_CREATE_ROUTE } from "../../../../app/router/routes";
import { assistantService, IAssistant } from "../../../../entities/assistant";
import { Table } from "../table/Table";
import { Items } from "../items/Items";


export const AssistantsWidget: FC = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true)

    const [assistants, setAssistants] = useState<IAssistant[]>([])

    const router = useNavigate()

    const {setIsAuth} = useMyActions()
    const {setGlobalMessage} = useGlobalMessageActions()

    const getData = async () => {
        try{
            setIsLoading(true)
            const assistantsRes = await assistantService.getAll()
            setAssistants(assistantsRes)
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: 'Ошибка при получении списка ассистентов', type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <section className={classes.container}>
            <section className={classes.addStudentWrap}>
                <section className={classes.button}> 
                    <MyButton onClick={() => router(ASSISTANT_CREATE_ROUTE.path)}>
                        Добавить ассистента
                    </MyButton>
                </section>
            </section>
            {
                isLoading
                    ?
                <section className="loader"><LoaderSpinner /></section>
                    :
                <>
                    <Table 
                        assistants={assistants}
                    />
                    <Items 
                        assistants={assistants}
                    />
                </>
            }
        </section>
    )
}
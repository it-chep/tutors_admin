import { FC, useState } from "react";
import classes from './notificationPushAllStudents.module.scss'
import tgImg from '../../../shared/lib/assets/tg.png'
import { Modal } from "../../../shared/ui/modal";
import { ConfirmationAction } from "../../../shared/ui/confirmationAction";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { useGlobalLoadingActions } from "../../../entities/globalLoading";
import { useMyActions } from "../../../entities/my";
import { AuthError } from "../../../shared/err/AuthError";
import { studentService } from "../../../entities/student";


export const NotificationPushAllStudents: FC = () => {

    const [open, setOpen] = useState<boolean>(false)
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsLoading} = useGlobalLoadingActions()
    const {setIsAuth} = useMyActions()

    const push = async () => {
        try{
            setIsLoading(true)
            setOpen(false)
            await studentService.notificationPushAllStudents()
            setGlobalMessage({message: 'Уведомления успешно отправились', type: 'ok'})
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: 'Ошибка отправки уведомлений', type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    return (
        <section className={classes.container}>
            <img onClick={() => setOpen(!open)} src={tgImg} height={32} width={32} />
            <Modal open={open} setOpen={setOpen}>
                <ConfirmationAction 
                    onClick={push}
                    setOpen={setOpen}
                    title="Вы точно хотите отправить уведомления о задолженностях ?"
                    type="send"
                />
            </Modal>
        </section>
    )
}
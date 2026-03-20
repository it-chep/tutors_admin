import { FC, useState } from "react";
import classes from './createComment.module.scss'
import { MyButton } from "../../../shared/ui/button";
import { Modal } from "../../../shared/ui/modal";
import { useGlobalLoadingActions } from "../../../entities/globalLoading";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { useMyActions } from "../../../entities/my";
import { ConfirmationAction } from "../../../shared/ui/confirmationAction";
import { MyTextarea } from "../../../shared/ui/myTextarea";
import { studentService } from "../../../entities/student";
import { AuthError } from "../../../shared/err/AuthError";

interface IProps {
    studentId: number;
    onSuccess: () => void;
}

export const CreateComment: FC<IProps> = ({studentId, onSuccess}) => {

    const [open, setOpen] = useState<boolean>(false)
    const [text, setText] = useState<string>('')
    const [error, setError] = useState<string>('')
    const {setIsLoading} = useGlobalLoadingActions()
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useMyActions()

    const onClose = (open: boolean) => {
        if(!open){
            setError('')
            setText('')
        }
        setOpen(open)
    }

    const onSend = async () => {
        if(!text){
            setError('Введите хоть что-то')
            return
        }
        try{
            setIsLoading(true)
            await studentService.addComment(studentId, text)
            setText('')
            setOpen(false)
            setGlobalMessage({type: 'ok', message: 'Комментарий успешно добавлен'})
            onSuccess()
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({type: 'error', message: 'Ошибка при добавлении комментария'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    return (
        <section className={classes.button}>
            <MyButton onClick={() => setOpen(true)}>
                Добавить комментарий
            </MyButton>
            <Modal open={open} setOpen={onClose}>
                <section className={classes.change}>
                    Сообщение студенту
                    <section className={classes.textarea}>
                        <MyTextarea
                            placeholder="Сообщение..."
                            value={text}
                            setValue={setText}
                            setError={setError}
                            error={error}
                        />
                    </section>
                    <MyButton 
                        error={error}
                        onClick={onSend}
                    >
                        Добавить
                    </MyButton>
                </section>
            </Modal>
        </section>
    )
}
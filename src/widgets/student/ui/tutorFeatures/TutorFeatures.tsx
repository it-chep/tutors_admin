import { FC, useState } from "react";
import classes from './tutorFeatures.module.scss'
import { DeleteAction } from "../../../../features/deleteAction";
import { Choose } from "../../../../shared/ui/choose";
import { tutorService } from "../../../../entities/tutor";
import { Modal } from "../../../../shared/ui/modal";
import { ConfirmationAction } from "../../../../shared/ui/confirmationAction";
import { AuthError } from "../../../../shared/lib/helpers/AuthError";
import { useGlobalMessageActions } from "../../../../entities/globalMessage";
import { useGlobalLoadingActions } from "../../../../entities/globalLoading";
import { useMyActions } from "../../../../entities/my";
import { IStudentData } from "../../../../entities/student";

interface IProps{
    id: number;
    newbie: boolean;
    student: IStudentData
    setStudent: (student: IStudentData) => void;
}

type TValue = {name: string, value: string}

export const TutorFeatures: FC<IProps> = ({id, newbie, student, setStudent}) => {

    const [open, setOpen] = useState<boolean>(false)
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsLoading} = useGlobalLoadingActions()
    const {setIsAuth} = useMyActions()

    const [selected, setSelected] = useState<string>('')

    const onTrialSession = async () => {
        await tutorService.trialLesson(id)
        setStudent({...student, is_newbie: false})
    }

    const onSession = async () => {
        try{
            setIsLoading(true)
            setOpen(false)
            await tutorService.conductLesson(id, +selected)
            setGlobalMessage({message: 'Занятие проведено', type: 'ok'})
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: 'Ошибка', type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }   

    const onSelected = (value: string) => {
        setSelected(value)
        setOpen(true)
    }

    const values: TValue[] = [
        {name: '1 час', value: '60'},
        {name: '1.5 часа', value: '90'},
        {name: '2 часа', value: '120'}
    ]

    return (
        <section className={classes.container}>
            {
                newbie
                    &&
                <DeleteAction 
                    successText="Пробное занятие проведено"
                    errorText="Ошибка"
                    questionText="Точно хотите провести студенту пробное занятие ?"
                    onDelete={onTrialSession}
                >
                    <section className={classes.button}>Пробное занятие</section>
                </DeleteAction>
            }
            <Choose 
                title="Провел занятие"
                onSelected={onSelected}
                values={values}
            />
            <Modal 
                open={open}
                setOpen={setOpen}
            >
                <ConfirmationAction 
                    setOpen={setOpen}
                    onClick={onSession}
                    title={`Вы уверены что вы провели занятие длительностью ${selected} ${selected === '1' ? 'час' : 'часа'}`}
                    type="delete"
                />
            </Modal>
        </section>
    )
}
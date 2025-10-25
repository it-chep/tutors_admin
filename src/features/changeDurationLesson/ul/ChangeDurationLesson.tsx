import { FC, useState } from "react";
import classes from './changeDurationLesson.module.scss'
import { DropDownListSelected } from "../../../shared/ui/dropDownSelected";
import { IItem } from "../../../shared/model/types";
import { Modal } from "../../../shared/ui/modal";
import editImg from '../../../shared/lib/assets/edit.png'
import { MyInput } from "../../../shared/ui/input";
import { MyButton } from "../../../shared/ui/button";
import { AuthError } from "../../../shared/err/AuthError";
import { useMyActions } from "../../../entities/my";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { useGlobalLoadingActions } from "../../../entities/globalLoading";
import { studentService } from "../../../entities/student";
import { ConfirmationAction } from "../../../shared/ui/confirmationAction";

interface IProps{
    durationInit: string;
    dateInit: string;
    lessonId: number;
    setData: (date: string, duration: number) => void;
}

export const ChangeDurationLesson: FC<IProps> = ({lessonId, durationInit, dateInit, setData}) => {

    const values = [
        {id: 1, name: '1 час', value: '60'},
        {id: 2, name: '1.5 часа', value: '90'},
        {id: 3, name: '2 часа', value: '120'}
    ]
    
    const [open, setOpen] = useState<boolean>(false)
    const [date, setDate] = useState<string>(dateInit)
    const [selected, setSelected] = useState<number>(values.find(v => v.value === durationInit)?.id || values[0].id)
    const {setIsAuth} = useMyActions()
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsLoading} = useGlobalLoadingActions()
    const [confirm, setConfirm] = useState<boolean>(false)

    const onSelected = (item: IItem) => {
        return (s: boolean) => {
            if(s){
                setSelected(item.id)
            }
        }
    }

    const onChange = async () => {
        try{
            setIsLoading(true)
            setOpen(false)
            const newDuration = values.find(v => v.id === selected)?.value || durationInit
            await studentService.changeLesson(lessonId, date, newDuration)
            setData(date, +newDuration)
            setGlobalMessage({message: 'Успешное редактированте занятия', type: 'ok'})
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: 'Ошибка при редактировании занятия', type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
        }
    } 

    const onClose = (open: boolean) => {
        if(!open){
            setConfirm(false)
        }
        setOpen(open)
    }

    return (
        <section className={classes.container}>
            <img src={editImg} onClick={() => setOpen(true)} />
            <Modal open={open} setOpen={onClose}>
                {
                    confirm
                        ?
                    <ConfirmationAction 
                        title="Точно хотите изменить длительность или дату занятия ?"
                        setOpen={onClose}
                        onClick={onChange}
                        type="send"
                    />
                        :
                    <section className={classes.change}>
                        <section className={classes.date}>
                            <span>Дата в формате "YYYY-MM-DD"</span>
                            <MyInput value={date} setValue={setDate} />
                        </section>
                        <DropDownListSelected 
                            items={values}
                            selectedIdItems={[selected]}
                            onSelected={onSelected}
                            isLoading={false}
                        />
                        <section className={classes.button}>
                            <MyButton onClick={() => setConfirm(true)}>Изменить</MyButton>
                        </section>
                    </section>
                }
            </Modal>
            
        </section>
    )
}
import { FC, useEffect, useState } from "react";
import classes from './addPenaltyBonus.module.scss'
import { Modal } from "../../../shared/ui/modal";
import { MyButton } from "../../../shared/ui/button";
import { MyInput } from "../../../shared/ui/input";
import { useGlobalLoadingActions } from "../../../entities/globalLoading";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { AuthError } from "../../../shared/err/AuthError";
import { useMyActions } from "../../../entities/my";
import { SwitchButton } from "../../../shared/ui/switchButton";
import { MyTextarea } from "../../../shared/ui/myTextarea";
import { TPenaltyBonus } from "../../../entities/penaltyBonus";

interface IProps {
    request: (amount: string, comment: string, type: TPenaltyBonus) => Promise<void>;
}

export const AddPenaltyBonus: FC<IProps> = ({request}) => {

    const [amount, setAmount] = useState<string>('')
    const [comment, setComment] = useState<string>('')
    const [type, setType] = useState<TPenaltyBonus>('bonus')
    const [error, setError] = useState<string>('')
    const [open, setOpen] = useState<boolean>(false)
    const {setIsLoading} = useGlobalLoadingActions()
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useMyActions()

    const check = (): boolean => {
        if(!amount){
            setError('Введите сумму премии/штрафа')
            return false
        }
        return true
    }

    const add = async () => {
        try{
            if(!check()){
                return
            }
            setIsLoading(true)
            await request(amount, comment, type)
            setGlobalMessage({message: 'Успешное добавление премии/штрафа', type: 'ok'})
            setOpen(false)
        }
        catch(e){
            console.log(e)
            setOpen(false)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: 'Ошибка при добавлении премии/штрафа', type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    const onSelected = (button: 1 | 2) => {
        if(button === 1){
            setType('bonus')
        }
        else{
            setType('penalty')
        }
    }

    useEffect(() => {
        if(!open){
            setAmount('')
            setError('')
        }
    }, [open])

    return (
        <section className={classes.container}>
            <section className={classes.button}>
                <MyButton 
                    onClick={() => setOpen(true)}
                >
                    Добавить премию/штраф
                </MyButton>
            </section>
            <Modal
                open={open}
                setOpen={setOpen}
            >
                <section className={classes.content}>
                    <SwitchButton
                        text1="Премия"
                        text2="Штраф"
                        selected={type === 'bonus' ? 1 : 2}
                        onSelected={onSelected}
                    />
                    <MyInput
                        title="Сумма"
                        type="number"
                        value={amount}
                        setValue={setAmount}
                        setError={setError}
                    />
                    <section>
                        <section className={classes.sign}>
                            Комментарий
                        </section>
                        <MyTextarea 
                            value={comment}
                            setValue={setComment}
                        />
                    </section>
                    <section className={classes.button}>
                        <MyButton
                            onClick={add}
                            error={error}
                        >
                            Добавить
                        </MyButton>
                    </section>
                </section>
            </Modal>
        </section>
    )
}
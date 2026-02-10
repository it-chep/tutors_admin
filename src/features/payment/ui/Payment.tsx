import { FC, useState } from "react";
import classes from './payment.module.scss'
import { MyInput } from "../../../shared/ui/input";
import { MyButton } from "../../../shared/ui/button";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { studentService } from "../../../entities/student";


interface IProps {
    hash: string;
}

export const Payment: FC<IProps> = ({hash}) => {
    
    const [amount, setAmount] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    const {setGlobalMessage} = useGlobalMessageActions()

    const onPayment = async () => {
        if(!amount){
            setError('Введите сумму')
            return
        }
        try{
            setIsLoading(true)
            await studentService.payment(hash, amount)
        }
        catch(e){
            if(e instanceof Error){
                setGlobalMessage({type: 'error', message: e.message})
            }
            else{
                setGlobalMessage({type: 'error', message: 'Ошибка оплаты'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    return (
        <section className={classes.container}>
            <section className={classes.title}>
                Введите сумму оплаты
            </section>
            <section className={classes.fn}>
                <MyInput 
                    value={amount} 
                    setValue={setAmount} 
                    type="number" 
                    setError={setError}
                    isLoading={isLoading}
                />
            </section>
            <section className={classes.fn}>
                <MyButton 
                    onClick={onPayment}
                    error={error}
                    isLoading={isLoading}
                >
                    Оплатить
                </MyButton>
            </section>
        </section>
    )
}
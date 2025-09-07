import { FC, useState } from "react";
import classes from './auth.module.scss'
import { useNavigate } from "react-router-dom";
import { useMyActions } from "../../../entities/my";
import { MyInput } from "../../../shared/ui/input";
import { VisiblePassword } from "../../../features/visiblePassword";
import { MyButton } from "../../../shared/ui/button";
import { useAppSelector } from "../../../app/store/store";


export const Auth: FC = () => {

    const router = useNavigate()

    const {my, isLoading, error} = useAppSelector(s => s.myReducer)
    const {setEmail, setIsAuth, setIsLoading, setError} = useMyActions()

    const [password, setPassword] = useState<string>('')

    const onClick = async () => {
        try{
            setIsLoading(true)
            // await myService.login(my.email, password)
            setIsAuth(true)
            router('/')
        }
        catch(e){
            setError('Пользователь не авторизован')
            console.log(e)
        }
        finally{
            setIsLoading(false)
        }
    }

    return (
        <section className={classes.container}>
            <h1 className={classes.title}>Вход</h1>
            <MyInput 
                placeholder='Email' 
                value={my.email} 
                setValue={setEmail} 
                type="email" 
                isLoading={isLoading}
                setError={setError}
            />
            <VisiblePassword 
                value={password} 
                setValue={setPassword} 
                isLoading={isLoading}
                setError={setError}
            />
            <section className={classes.button}>
                <MyButton
                    onClick={onClick}
                    isLoading={isLoading}
                    error={error}
                >
                    Войти
                </MyButton>
            </section>
        </section>
    )
}
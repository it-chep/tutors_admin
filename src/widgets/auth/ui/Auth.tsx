import { FC, useState } from "react";
import classes from './auth.module.scss'
import { useNavigate, useOutletContext } from "react-router-dom";
import { myService, useMyActions } from "../../../entities/my";
import { MyInput } from "../../../shared/ui/input";
import { VisiblePassword } from "../../../features/visiblePassword";
import { MyButton } from "../../../shared/ui/button";
import { useAppSelector } from "../../../app/store/store";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../../../app/router/routes";


export const Auth: FC = () => {

    const router = useNavigate()

    const {my, isLoading, error} = useAppSelector(s => s.myReducer)
    const {setEmail, setIsLoading, setError} = useMyActions()

    const [password, setPassword] = useState<string>('')

    const [isLogin, setIsLogin] = useState<boolean>(true)

    const {setState} = useOutletContext<{setState: (state: 1 | 2) => void}>()

    const onClick = async () => {
        try{
            setIsLoading(true)
            await myService.login(my.email, password)
            setState(2)
            router(isLogin ? LOGIN_ROUTE.path : REGISTRATION_ROUTE.path)
        }
        catch(e){
            setError('Ошибка')
            console.log(e)
        }
        finally{
            setIsLoading(false)
        }
    }

    return (
        <section className={classes.container}>
            <h1 className={classes.title}>{isLogin ? 'Вход' : 'Регистрация'}</h1>
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
                    {isLogin ? 'Войти' : 'Зарегистрироваться'}
                </MyButton>
            </section>
            <section 
                onClick={() => {
                    setIsLogin(!isLogin)
                }}
                onMouseDown={e => e.preventDefault()}
                className={classes.link}
            >
                {!isLogin ? 'Вход' : 'Регистрация'}
            </section>
        </section>
    )
}
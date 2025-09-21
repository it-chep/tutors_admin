import { FC, useState } from "react";
import classes from './adminChange.module.scss'
import { MyInput } from "../../../../shared/ui/input";
import { useGlobalLoadingActions } from "../../../../entities/globalLoading";
import { useGlobalMessageActions } from "../../../../entities/globalMessage";
import { useMyActions } from "../../../../entities/my";
import { AuthError } from "../../../../shared/lib/helpers/AuthError";
import { MyButton } from "../../../../shared/ui/button";
import { useNavigate } from "react-router-dom";
import { ADMINS_ROUTE } from "../../../../app/router/routes";
import { adminChange, adminService, IAdminCreate } from "../../../../entities/admin";


export const AdminChange: FC = () => {

    const {setIsLoading} = useGlobalLoadingActions()
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useMyActions()

    const [admin, setAdmin] = useState<IAdminCreate>({
        full_name: '',
        phone: '',
        tg: '',
        email: '',
    })

    const {setTg, setFullName, setPhone, setEmail} = adminChange(admin, setAdmin)

    const router = useNavigate()

    const onSend = async () => {
        try{
            setIsLoading(true)
            await adminService.create(admin)
            router(ADMINS_ROUTE.path)
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: `Ошибка при создании админа`, type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    return (
        <section className={classes.container}>
            <h1 className={classes.title}>Создание админа</h1>
            <MyInput 
                title="ФИО админа"
                value={admin.full_name}
                setValue={setFullName}
            />
            <MyInput 
                title="Email админа"
                value={admin.email}
                setValue={setEmail}
            />
            <MyInput 
                title="Номер телефона админа"
                value={admin.phone}
                setValue={setPhone}
            />
            <MyInput 
                title="Телеграм админа"
                value={admin.tg}
                setValue={setTg}
            />
            <section className={classes.button}>
                <MyButton
                    onClick={onSend}
                >
                    Создать
                </MyButton>
            </section>
        </section>
    )
}
import classes from './auth.module.scss'
import { Auth } from '../../widgets/auth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector } from '../../app/store/store';


export default function AuthPage(){

    const router = useNavigate()
    const {my} = useAppSelector(s => s.myReducer) 

    useEffect(() => {
        if(my.isAuth){
            router('/')
        }
    }, [])

    return (
        !my.isAuth
            ?
        <section className={classes.wrapper}>
            <Auth />
        </section>
            :
        <></>
    )
}
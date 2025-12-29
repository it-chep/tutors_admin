import { FC, useState } from "react";
import classes from './navMobile.module.scss'
import { NavPages } from "../navPages/NavPages";


export const NavMobile: FC = () => {

    const [open, setOpen] = useState<boolean>(false)

    return (
        <section className={classes.container}>
            <svg onClick={() => setOpen(!open)} className={classes.burger} width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 18L20 18" stroke="#000000" strokeWidth="2" strokeLinecap="round"/>
                <path d="M4 12L20 12" stroke="#000000" strokeWidth="2" strokeLinecap="round"/>
                <path d="M4 6L20 6" stroke="#000000" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <section 
                className={classes.sidebar + (open ? ` ${classes.open}` : '')}
            >
                <NavPages />
            </section>
            <section 
                onClick={() => setOpen(false)}
                className={classes.darken + (open ? ` ${classes.open}` : '')} 
            />
        </section>
    )
}
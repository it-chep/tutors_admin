import React, { FC, PropsWithChildren, useEffect } from "react";
import classes from './modal.module.scss'

interface IProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const Modal: FC<IProps & PropsWithChildren> = ({open, setOpen, children}) => {

    useEffect(() => {
        if(open){
            document.body.style.overflow = 'hidden'
        }
        else{
            document.body.style.overflow = ''
        }
    }, [open])

    const onDarkenCLick = () => {
        setOpen(false)
    }

    return (
        open
            ?
        <section className={classes.wrapper}>
            <section onClick={onDarkenCLick} className={classes.darken}></section>
            <section className={classes.content}>
                {children}
            </section>
        </section>
            :
        <></>
    )
}
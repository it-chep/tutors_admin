import { FC, PropsWithChildren, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import classes from './dropdown.module.scss'

interface IProps {
    title: ReactNode;
}

export const Dropdown: FC<IProps & PropsWithChildren> = ({title, children}) => {

    const [open, setOpen] = useState<boolean>(false)

    const refContainer = useRef<HTMLDivElement>(null)

    const clickDoc = useCallback((e: MouseEvent) => {
        const target = e.target as Element;
        if((refContainer.current && refContainer.current.contains(target)) || target.closest('.modal')){}
        else{
            setOpen(false)
            document.removeEventListener('click', clickDoc, {capture: true})
        }
    }, [])

    useEffect(() => {
        return () => {
            document.removeEventListener('click', clickDoc, {capture: true})
        }
    }, [])  

    const onClick = () => {
        if(open){
            setOpen(false)
            document.removeEventListener('click', clickDoc, {capture: true})
        }
        else{
            document.addEventListener('click', clickDoc, {capture: true})
            setOpen(true)
        }
    }

    return (
        <section 
            ref={refContainer} 
            className={classes.container + (open ? ` ${classes.open}` : '')}
        >
            <section 
                onClick={onClick} 
                className={classes.title}
                onMouseDown={e => e.preventDefault()}
            >
                {title}
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M26 12L16 22L6 12" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>     
            </section>        
            <section className={classes.dropdown}>
                {children}
            </section>
        </section>
    )
}
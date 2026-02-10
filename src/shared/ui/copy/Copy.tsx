import { FC, useRef, useState } from "react";
import classes from './copy.module.scss'

interface IProps {
    text: string;
}

export const Copy: FC<IProps> = ({text}) => {

    const [open, setOpen] = useState<boolean>(false)
    const timerId = useRef<NodeJS.Timeout | null>(null)

    const onCopy = async () => {
        if(timerId.current){
            clearTimeout(timerId.current)
        }
        await navigator.clipboard.writeText(text)
        setOpen(true)
        timerId.current = setTimeout(() => setOpen(false), 2000)
    }

    return (
        <section className={classes.container}>
            <svg onClick={onCopy} width="25" height="25" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 21H27V5H11V11" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M21 11H5V27H21V11Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <section className={classes.copied + (open ? ` ${classes.open}` : '')}>
                Скопировано
            </section>
        </section>
    )
}
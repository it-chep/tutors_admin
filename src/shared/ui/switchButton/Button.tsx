import { FC, PropsWithChildren } from "react";
import classes from './switchButton.module.scss'


export const Button: FC<PropsWithChildren> = ({children}) => {

    return (
        <button 
            className={classes.button}
        >
            {children}
        </button>
    )
}
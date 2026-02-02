import { FC } from "react";
import classes from './labelText.module.scss'

interface IProps{
    label: string;
    text: string | React.ReactElement;
}

export const LabelText: FC<IProps> = ({label, text}) => {


    return (
        <section className={classes.container}>
            <section className={classes.label}>
                {label}
            </section>
            <section className={classes.text}>
                {text}
            </section>
        </section>
    )
}
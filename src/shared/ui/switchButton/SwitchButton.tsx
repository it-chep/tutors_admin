import { FC } from "react";
import classes from './switchButton.module.scss'
import { Button } from "./Button";

interface IProps {
    text1: string;
    text2: string;
    selected: 1 | 2;
    onSelected: (button: 1 | 2) => void;
}

export const SwitchButton: FC<IProps> = ({text1, text2, selected, onSelected}) => {

    return (
        <section className={classes.container}>
            <section 
                className={classes.buttonWrap + (selected === 1 ? ` ${classes.selected}` : '')}
                onClick={() => onSelected(1)}
            >
                <Button>
                    {text1}
                </Button>
            </section>
            <section 
                className={classes.buttonWrap + (selected === 2 ? ` ${classes.selected}` : '')}
                onClick={() => onSelected(2)}
            >
                <Button>
                    {text2}
                </Button>
            </section>
        </section>
    )
}
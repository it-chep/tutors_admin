import { ComponentProps, FC, useRef } from "react";
import classes from './myTextarea.module.scss'

interface IProps{
    value: string;
    onBlur?: () => void;
    setValue: (value: string) => void;
    isLoading?: boolean;
    error?: string;
    setError?: (err: string) => void;
    sign?: string;
}

export const MyTextarea: FC<IProps & ComponentProps<'textarea'>> = ({
    value, setValue, setError, onBlur = () => {}, sign, children, ...props
}) => {

    const refBox = useRef<HTMLDivElement>(null)
    
    const onBlurInput = () => {
        onBlur()
        if(refBox.current){
            refBox.current.classList.remove(classes.hightlight)
        }
    }

    const setValueWrap = (value: string) => {
        setError && setError('')
        setValue(value)
    }
    
    const onFocus = () => {
        if(refBox.current){
            refBox.current.classList.add(classes.hightlight)
        }
    }

    return (
        <section ref={refBox} className={classes.textareaBox}>
            <section className={classes.sign}>
                {sign}&nbsp;
            </section>
            <section className={classes.wrap}>
                <textarea 
                    {...props}
                    onFocus={onFocus}
                    onBlur={onBlurInput}
                    value={value} 
                    onChange={e => setValueWrap(e.target.value)}
                />
                {children}
            </section>
        </section>
    )
}
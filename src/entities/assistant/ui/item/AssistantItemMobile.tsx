import { FC, PropsWithChildren } from "react";
import classes from './assistantItem.module.scss'
import { IAssistant } from "../../model/types";
import { LabelText } from "../../../../shared/ui/sign";

interface IProps {
    assistant: IAssistant;
}

export const AssistantItemMobile: FC<IProps & PropsWithChildren> = ({assistant, children}) => {

    return (
        <section className={classes.itemMobile}>
            <LabelText 
                label="ID"
                text={String(assistant.id)}
            />
            <LabelText 
                label="ФИО"
                text={assistant.full_name}
            />
            <LabelText 
                label="Телеграм"
                text={
                    <a target="_blank" className={classes.link} href={assistant.tg}>
                        Написать в ТГ
                    </a>    
                }
            />
            <section className={classes.feature}>
                {children}
            </section>
        </section>
    )
}
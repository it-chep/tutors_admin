import { FC, PropsWithChildren } from "react";
import classes from './assistantItem.module.scss'
import { IAssistant } from "../../model/types";


interface IProps {
    assistant: IAssistant;
}

export const AssistantItem: FC<IProps & PropsWithChildren> = ({assistant, children}) => {

    return (
        <tr className={classes.item}>
            <td className={classes.id}>
                {assistant.id}
            </td>  
            <td className={classes.fio}>
                {assistant.full_name}
            </td>
            <td className={classes.tg}>
                <a target="_blank" className={classes.link} href={assistant.tg}>
                    Написать в ТГ
                </a>
            </td>
            <td className={classes.feature}>
                {children}
            </td>
        </tr>
    )
}
import { FC, PropsWithChildren } from "react";
import classes from './assistantCard.module.scss'
import { DataList } from "../../../../shared/ui/dataList";
import { IAssistantData } from "../../model/types";

interface IProps {
    assistant: IAssistantData;
}

export const AssistantCard: FC<IProps & PropsWithChildren> = ({assistant, children}) => {


    return (
        <section className={classes.card}>
            <DataList
                title="Данные"
                list={[
                    `ID: ${assistant.id}`,
                    `ФИО: ${assistant.full_name}`,
                    `Телефон: ${assistant.phone}`,
                    `Доступные ТГ: ${assistant.tg_admins_usernames.join(', ')}`,
                    <a 
                        target="_blank" 
                        href={assistant.tg} 
                        className={classes.highlight}
                    >
                        Написать в тг
                    </a>,
                ]}
            />
        </section>
    )
}
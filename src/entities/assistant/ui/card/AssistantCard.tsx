import React, { FC, PropsWithChildren } from "react";
import classes from './assistantCard.module.scss'
import { DataList } from "../../../../shared/ui/dataList";
import { IAssistantData } from "../../model/types";

interface IProps {
    assistant: IAssistantData;
    isAdmin: boolean;
}

export const AssistantCard: FC<IProps & PropsWithChildren> = ({assistant, isAdmin}) => {

    const list = isAdmin ? [
        `ID: ${assistant.id}`,
        `ФИО: ${assistant.full_name}`,
        `Дата регистрации: ${assistant.created_at}`,
        `Телефон: ${assistant.phone}`,
        `Доступные ТГ: ${assistant.tg_admins_usernames.map(tg => tg.name).join(', ')}`,
        <a
            target="_blank"
            href={assistant.tg}
            className={classes.highlight}
        >
            Написать в тг
        </a>,
    ] : [
        `ID: ${assistant.id}`,
        `ФИО: ${assistant.full_name}`,
        <a
            target="_blank"
            href={assistant.tg}
            className={classes.highlight}
        >
            Написать в тг
        </a>,
    ]


    return (
        <section className={classes.card}>
            <DataList
                title="Данные"
                list={list}
            />
        </section>
    )
}
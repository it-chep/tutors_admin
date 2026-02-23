import React, { FC, PropsWithChildren } from "react";
import classes from './card.module.scss'
import { ITutorData } from "../../model/types";
import { DataList } from "../../../../shared/ui/dataList";
import { Calendar } from "../../../../features/calendar";

interface IProps {
    tutor: ITutorData;
}

export const TutorCard: FC<IProps & PropsWithChildren> = ({tutor, children}) => {


    return (
        <section className={classes.card}>
            <DataList
                title="Данные"
                list={([
                    `ID: ${tutor.id}`,
                    `ФИО: ${tutor.full_name}`,
                    `Дата регистрации: ${tutor.created_at}`,
                    `Телефон: ${tutor.phone}`,
                    `Стоимость часа: ${tutor.cost_per_hour} ₽`,
                    <a
                        target="_blank"
                        href={tutor.tg}
                        className={classes.highlight}
                    >
                        Написать в тг
                    </a>,
                    `Предмет: ${tutor.subject_name}`,
                    tutor.tg_admin_username ? `Рабочий аккаунт тг: ${tutor.tg_admin_username}` : null,
                    tutor.is_archive ? `Статус: В архиве` : null,
                ] as (string | React.ReactNode)[]).filter(item => item !== null)}
            />
            <section className={classes.finance}>
                <DataList 
                    title="Финансы"
                    list={[
                        children
                    ]}
                />
            </section>
            <section className={classes.financeMobile}>
                <section className={classes.title}>Финансы</section>
                {children}
            </section>
        </section>
    )
}
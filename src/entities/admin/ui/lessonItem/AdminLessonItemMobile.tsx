import { FC, PropsWithChildren } from "react";
import classes from './lessonItem.module.scss'
import { IAdminLesson } from "../../model/types";
import { getLocaleDate } from "../../../../shared/lib/helpers/getLocalDate";
import { Link } from "react-router-dom";
import { LabelText } from "../../../../shared/ui/sign";


interface IProps {
    lesson: IAdminLesson;
}

export const AdminLessonItemMobile: FC<IProps & PropsWithChildren> = ({lesson, children}) => {

    return (
        <section 
            className={classes.itemMobile}
        >
            <LabelText 
                label="Дата"
                text={getLocaleDate(new Date(lesson.created_at + 'Z'), true)}
            />
            <LabelText 
                label="ФИО репетитора"
                text={<Link to={'/tutor/' + lesson.tutor_id}>{lesson.tutor_name}</Link>}
            />
            <LabelText 
                label="ФИО студента"
                text={<Link to={'/student/' + lesson.student_id}>{lesson.student_name}</Link>}
            />
            <LabelText 
                label="Длительность"
                text={String(lesson.duration_in_minutes)}
            />
            <section className={classes.features}>
                {children}
            </section>
        </section>
    )
}
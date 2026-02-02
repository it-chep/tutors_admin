import { FC, PropsWithChildren } from "react";
import classes from './lessonItem.module.scss'
import { ILesson } from "../../model/types";
import { getLocaleDate } from "../../../../shared/lib/helpers/getLocalDate";
import { Link } from "react-router-dom";
import { LabelText } from "../../../../shared/ui/sign";


interface IProps {
    lesson: ILesson;
    showFio?: boolean;
}

export const LessonItemMobile: FC<IProps & PropsWithChildren> = ({lesson, showFio, children}) => {

    return (
        <section
            className={classes.itemMobile}
        >
            <LabelText
                label="Дата"
                text={getLocaleDate(new Date(lesson.date + 'Z'), true)}
            />
            {
                showFio
                    &&
                <LabelText
                    label="ФИО"
                    text={
                        <Link to={'/student/' + lesson.student_id}>
                            {lesson.student_full_name}
                        </Link>
                    }
                />
            }
            <LabelText
                label="Длительность"
                text={String(lesson.duration_minutes)}
            />
            <LabelText
                label="Действия"
                text={
                    <>
                        {children}
                    </>
                }
            />
        </section>
    )
}
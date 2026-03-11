import { FC, PropsWithChildren } from "react";
import classes from './lessonItem.module.scss'
import { ILesson } from "../../model/types";
import { formatUtcToMsk } from "../../../../shared/lib/helpers/formatUtcToMsk";
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
                text={formatUtcToMsk(lesson.date) + (" (мск)")}
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

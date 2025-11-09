import { FC, PropsWithChildren } from "react";
import classes from './lessonItem.module.scss'
import { ILesson } from "../../model/types";
import { getLocaleDate } from "../../../../shared/lib/helpers/getLocalDate";


interface IProps {
    lesson: ILesson;
    showFio: boolean;
}

export const LessonItem: FC<IProps & PropsWithChildren> = ({lesson, showFio, children}) => {

    return (
        <tr 
            className={classes.item}
        >
            <td className={classes.id}>
                {getLocaleDate(new Date(lesson.date + 'Z'))}
            </td>  
            {
                showFio
                    &&
                <td className={classes.fio}>
                    {lesson.student_full_name}
                </td>
            }
            <td className={classes.duration}>
                {lesson.duration_minutes}
            </td>
            <td className={classes.features}>
                {children}
            </td>
        </tr>
    )
}
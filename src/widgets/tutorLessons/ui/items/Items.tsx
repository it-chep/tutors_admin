import { FC } from "react";
import classes from './items.module.scss'
import { ILesson, LessonItemMobile } from "../../../../entities/student";
import { ChangeDurationLesson } from "../../../../features/changeDurationLesson";
import { DeleteAction } from "../../../../features/deleteAction";

interface IProps{
    lessons: ILesson[];
    setData: (ind: number) => (date: string, duration_minutes: number) => void;
    onDelete: (ind: number, lessonId: number) => Promise<void>
}

export const Items: FC<IProps> = ({lessons, setData, onDelete}) => {


    return (
        <section className={classes.items}>
            {lessons.map((lesson, ind) => 
                <LessonItemMobile key={lesson.id} showFio lesson={lesson}>
                    <section className={classes.features}>
                        <ChangeDurationLesson
                            lessonId={lesson.id}
                            durationInit={`${lesson.duration_minutes}`} 
                            dateInit={lesson.date}
                            setData={setData(ind)}
                        />
                        <DeleteAction
                            questionText="Вы точно хотите удалить занятие ?"
                            successText="Занятие успешно удалено"
                            errorText="Ошибка при удалении занятия"
                            onDelete={() => onDelete(ind, lesson.id)}
                        />
                    </section>
                </LessonItemMobile>
            )}
        </section>
    )
}
import { FC } from "react";
import classes from './items.module.scss'
import { ChangeDurationLesson } from "../../../../features/changeDurationLesson";
import { DeleteAction } from "../../../../features/deleteAction";
import { AdminLessonItemMobile, IAdminLesson } from "../../../../entities/admin";

interface IProps{
    lessons: IAdminLesson[];
    setData: (ind: number) => (date: string, duration_minutes: number) => void;
    onDelete: (ind: number, lessonId: number) => Promise<void>
}

export const Items: FC<IProps> = ({lessons, setData, onDelete}) => {

    return (
        <section className={classes.items}>
            {lessons.map((lesson, ind) => 
                <AdminLessonItemMobile
                    key={lesson.id} 
                    lesson={lesson} 
                >
                    <section className={classes.features}>
                        <ChangeDurationLesson 
                            lessonId={lesson.id}
                            durationInit={`${lesson.duration_in_minutes}`} 
                            dateInit={lesson.created_at}
                            setData={setData(ind)}
                        />
                        <DeleteAction 
                            questionText="Вы точно хотите удалить занятие ?"
                            successText="Занятие успешно удалено"
                            errorText="Ошибка при удалении занятия"
                            onDelete={() => onDelete(ind, lesson.id)}
                        />
                    </section>
                </AdminLessonItemMobile>
            )}
        </section>
    )
}
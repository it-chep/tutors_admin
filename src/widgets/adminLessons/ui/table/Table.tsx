import { FC } from "react";
import classes from './table.module.scss'
import { ChangeDurationLesson } from "../../../../features/changeDurationLesson";
import { DeleteAction } from "../../../../features/deleteAction";
import { AdminLessonItem, IAdminLesson } from "../../../../entities/admin";

interface IProps{
    lessons: IAdminLesson[];
    setData: (ind: number) => (date: string, duration_minutes: number) => void;
    onDelete: (ind: number, lessonId: number) => Promise<void>
}

export const Table: FC<IProps> = ({lessons, setData, onDelete}) => {

    return (
        <table className={classes.table}>
            <thead>
                <tr className={classes.item}>
                    <th>Дата</th>
                    <th>ФИО репетитора</th>
                    <th>ФИО студента</th>
                    <th>Длительность</th>
                </tr>
            </thead>
            <tbody>
                {lessons.map((lesson, ind) => 
                    <AdminLessonItem
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
                    </AdminLessonItem>
                )}
            </tbody>
        </table>
    )
}
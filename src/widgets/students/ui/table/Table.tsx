import { FC } from "react";
import classes from './table.module.scss'
import { IStudent, StudentItem } from "../../../../entities/student";
import { useAppSelector } from "../../../../app/store/store";
import { useNavigate } from "react-router-dom";
import { MyButton } from "../../../../shared/ui/button";

interface IProps{
    studentsSearch: IStudent[];
    highlight: boolean;
}

export const Table: FC<IProps> = ({studentsSearch, highlight}) => {
    
    const {my} = useAppSelector(s => s.myReducer)
    const router = useNavigate()

    return (
        <table className={classes.table}>
            <thead>
                <tr className={classes.item}>
                    <th>ID</th>
                    <th>Фио</th>
                    {
                        my.role !== 'tutor'
                            &&
                        <>
                            <th>Фио родителя</th>
                            <th>Телеграм</th>
                            <th>Баланс</th>
                        </>
                    }
                </tr>
            </thead>
            <tbody>
                {studentsSearch.map(student => 
                    <StudentItem
                        highlight={highlight}
                        key={student.id}
                        student={student}
                    >
                        <section className={classes.button}>
                            <MyButton onClick={() => router('/student/' + student.id)}>
                                Подробнее
                            </MyButton>
                        </section>
                    </StudentItem>
                )}
            </tbody>
        </table>
    )
}
import { FC } from "react";
import classes from '../students/studentsWidget.module.scss'
import { IStudent, StudentItemMobile } from "../../../../entities/student";
import { MyButton } from "../../../../shared/ui/button";
import { useNavigate } from "react-router-dom";

interface IProps{
    studentsSearch: IStudent[];
    highlight?: boolean;
}

export const Items: FC<IProps> = ({studentsSearch, highlight}) => {

    const router = useNavigate()

    return (
        <section className={classes.items}>
            {studentsSearch.map(student => 
                <StudentItemMobile
                    highlight={highlight}
                    key={student.id}
                    student={student}
                >
                    <section className={classes.button}>
                        <MyButton onClick={() => router('/student/' + student.id)}>
                            Подробнее
                        </MyButton>
                    </section>
                </StudentItemMobile>
            )}
        </section>
    )
}
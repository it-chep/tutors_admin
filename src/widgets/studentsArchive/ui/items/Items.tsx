import { FC } from "react";
import classes from './items.module.scss'
import { IStudent, StudentItemMobile } from "../../../../entities/student";
import { MyButton } from "../../../../shared/ui/button";
import { useNavigate } from "react-router-dom";

interface IProps{
    studentsSearch: IStudent[];
}

export const Items: FC<IProps> = ({studentsSearch}) => {

    const router = useNavigate()

    return (
        <section className={classes.items}>
            {studentsSearch.map(student => 
                <StudentItemMobile
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
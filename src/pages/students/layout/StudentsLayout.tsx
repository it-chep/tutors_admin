import { LayoutPages } from "../../layoutPages";
import { STUDENT_CREATE_ROUTE, STUDENTS_ARCHIVE_ROUTE, STUDENTS_ROUTE } from "../../../app/router/routes";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import classes from './studentsLayout.module.scss'
import { SwitchButton } from "../../../shared/ui/switchButton";
import { useAppSelector } from "../../../app/store/store";
import { StudentFilters } from "../../../features/studentFilters";
import { HintHighlight } from "../../../widgets/students";
import { MyButton } from "../../../shared/ui/button";
import { useState } from "react";
import { AdminActionsStudents } from "../../../widgets/adminActionStudents";


export default function StudentsLayoutPage() {
    
    const {pathname} = useLocation()
    const router = useNavigate()
    const [trigger, setTrigger] = useState<boolean>(false) // при смене платежки у всех студентов, обновляем список студентов

    const title = pathname === STUDENTS_ROUTE.path ? STUDENTS_ROUTE.name : STUDENTS_ARCHIVE_ROUTE.name;

    const isStudent = pathname === '/students';

    const {my} = useAppSelector(s => s.myReducer)
    const permission =  (my.role === 'admin' || my.role === 'assistant')

    const onSwitchPage = (selectedPage: 1 | 2) => {
        if(selectedPage === 1) { // students
            router(STUDENTS_ROUTE.path)
        }
        else { // students_archive
            router(STUDENTS_ARCHIVE_ROUTE.path)
        }
    }

    return (
        <LayoutPages title={title}>
            {
                permission
                    &&
                <>
                <section className={classes.header}>
                    {
                        my.paid_functions['student_archive']
                            &&
                        <section className={classes.switchButton}>
                            <SwitchButton
                                text1="Студенты"
                                text2="Архив студентов"
                                onSelected={onSwitchPage}
                                selected={isStudent ? 1 : 2}
                            />
                        </section>
                    }
                    <section className={classes.wrap}>
                        {
                            isStudent
                                &&
                            <>
                            <section className={classes.hint}>
                                <HintHighlight />
                            </section>
                      
                            <section className={classes.add}> 
                                <MyButton onClick={() => router(STUDENT_CREATE_ROUTE.path)}>
                                    Добавить студента
                                </MyButton>
                            </section>
                            </>
                        }
                    </section>
                </section>
                <section className={classes.filter}>
                    <StudentFilters />
                </section>
                {
                    isStudent
                        &&
                    <section className={classes.adminActionsStudents}>
                        <AdminActionsStudents 
                            trigger={trigger} 
                            setTrigger={setTrigger} 
                        />
                    </section>
                }
            </>
            }
            <section className={classes.students + (permission ? ` ${classes.permission}` : '')}>
                <Outlet context={trigger} />
            </section>
        </LayoutPages>
    )
}
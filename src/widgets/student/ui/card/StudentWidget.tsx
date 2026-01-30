import { FC, PropsWithChildren, useEffect, useState } from "react";
import { useMyActions } from "../../../../entities/my";
import { useGlobalMessageActions } from "../../../../entities/globalMessage";
import { IStudentData, StudentCard, studentService } from "../../../../entities/student";
import { AuthError } from "../../../../shared/lib/helpers/AuthError";
import classes from './studentWidget.module.scss'
import { StudentCalendar } from "../studentCalendar/StudentCalendar";
import { useAppSelector } from "../../../../app/store/store";
import { Header } from "../header/Header";
import { DataList } from "../../../../shared/ui/dataList";
import { TutorFeatures } from "../tutorFeatures/TutorFeatures";
import { StudentsMove } from "../../../../features/studentsMove";
import { ITutor } from "../../../../entities/tutor";
import { ChangeStudentBalance } from "../../../../features/changeStudentBalance";
import { LoaderSpinner } from "../../../../shared/ui/spinner";
import { ChangeStudentPayment } from "../../../../features/changeStudentPayment";
import { IPayment } from "../../../../entities/admin";

interface IProps {
    id: number;
}

export const StudentWidget: FC<IProps & PropsWithChildren> = ({id, children}) => {

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [student, setStudent] = useState<IStudentData>()
    const {setIsAuth} = useMyActions()
    const {setGlobalMessage} = useGlobalMessageActions()

    const setBalance = (balance: string) => {
        const copy: IStudentData = JSON.parse(JSON.stringify(student))
        copy.balance = balance;
        setStudent(copy)
    }

    const {my} = useAppSelector(s => s.myReducer)

    const getData = async () => {
        try{
            if(id){
                setIsLoading(true)
                const studentRes = await studentService.get(+id)
                setStudent(studentRes)
            }
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: 'Ошибка при получении данных о студенте', type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const onNewTutor = (tutor: ITutor) => {
        if(student) 
            setStudent({...student, tutor_id: tutor.id, tutor_name: tutor.full_name})
    }

    const setStudentPayment = (payment: IPayment) => {
        if(student) 
            setStudent({...student, payment_id: payment.payment_id, payment_name: payment.payment_name})
    }

    return (
        <section className={classes.container}>   
            {
                isLoading
                    ?
                <section className={classes.loader}><LoaderSpinner /></section>
                    :
                student
                    &&
                (
                    my.role !== 'tutor'
                        ?
                    <>
                        <Header 
                            student={student} 
                            setStudent={setStudent} 
                        />
                        <StudentCard
                            student={student}
                            paymentChange={
                                <ChangeStudentPayment 
                                    payment_id={student.payment_id}
                                    payment_name={student.payment_name}
                                    studentId={student.id}
                                    setStudentPayment={setStudentPayment}   
                                />
                            }
                            balanceChange={
                                <ChangeStudentBalance 
                                    studentId={student.id} 
                                    setStudentBalance={setBalance} 
                                />
                            }
                        />
                        <section className={classes.move}>
                            <StudentsMove 
                                title="Смена репетитора у студента" 
                                onSelected={onNewTutor}
                                tutorId={student.tutor_id}
                                studentId={student.id} 
                            />
                        </section>
                        {
                            (my.role === 'admin' || my.role === 'super_admin') 
                                &&
                            <StudentCalendar id={student.id} />
                        }
                        <section className={classes.lessons}>
                            {children}
                        </section>
                    </>
                        :
                    <section className={classes.tutor}>
                        <DataList 
                            title="Данные студента"
                            list={[
                                `ID: ${student.id}`,
                                `Имя: ${student.last_name} ${student.first_name} ${student.middle_name}`,
                                `Предмет: ${student.subject_name}`,
                            ]}
                        />
                        <TutorFeatures 
                            newbie={student.is_newbie}
                            id={student.id} 
                        />
                        <section className={classes.lessons}>
                            {children}
                        </section>
                    </section>
                )
            }
        </section>
    )
}
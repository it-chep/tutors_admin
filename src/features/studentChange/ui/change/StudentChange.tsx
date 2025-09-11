import React, { FC } from "react";
import classes from './studentChange.module.scss'
import { MyInput } from "../../../../shared/ui/input";
import { useAppSelector } from "../../../../app/store/store";
import { useStudentActions } from "../../../../entities/student";
import { Send } from "../send/Send";

interface IProps {
    isCreate: boolean;
    chooseSubject: React.ReactNode;
    chooseTutor: React.ReactNode;
}

export const StudentChange: FC<IProps> = ({isCreate, chooseSubject, chooseTutor}) => {

    const {student} = useAppSelector(s => s.studentReducer)

    const {
        setFirstName, setCostPerHour, setLastName, setMiddleName, setParentFullName, 
        setParentPhone, setParentTg, setPhone, setTg
    } = useStudentActions()

    return (
        <section className={classes.container}>
            <h1 className={classes.title}>{isCreate ? 'Создание' : 'Обновление'} студента</h1>
            <MyInput 
                title="Фамилия студента"
                value={student.last_name}
                setValue={setLastName}
            />
            <MyInput 
                title="Имя студента"
                value={student.first_name}
                setValue={setFirstName}
            />
            <MyInput 
                title="Отчество студента"
                value={student.middle_name}
                setValue={setMiddleName}
            />
            <MyInput 
                title="Номер телефона студента"
                value={student.phone}
                setValue={setPhone}
            />
            <MyInput 
                title="Телеграм студента"
                value={student.tg}
                setValue={setTg}
            />
            <MyInput 
                title="Фио родителя"
                value={student.parent_full_name}
                setValue={setParentFullName}
            />
            <MyInput 
                title="Номер родителя"
                value={student.parent_phone}
                setValue={setParentPhone}
            />
            <MyInput 
                title="Телеграм родителя"
                value={student.parent_tg}
                setValue={setParentTg}
            />
            {chooseSubject}
            <MyInput 
                title="Стоимость часа"
                value={student.cost_per_hour}
                setValue={setCostPerHour}
            />
            {chooseTutor}
            <Send isCreate={isCreate} />
        </section>
    )
}
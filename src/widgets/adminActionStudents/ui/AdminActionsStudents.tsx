import { FC } from "react";
import classes from './adminActionStudents.module.scss'
import { Dropdown } from "../../../shared/ui/dropdown";
import { NotificationPushAllStudents } from "../../../features/notificationPushAllStudents";
import { ChangeAllStudentsPayment } from "../../../features/changeAllStudentsPayment";
import { useAppSelector } from "../../../app/store/store";

interface IProps {
    setTrigger: (trigger: boolean) => void;
    trigger: boolean;
}

export const AdminActionsStudents: FC<IProps> = ({trigger, setTrigger}) => {

    const {my} = useAppSelector(s => s.myReducer)

    return (
        <Dropdown
            title={<span className={classes.actionSign}>Действия</span>}
        >
            <section className={classes.features}>
                {
                    <section className={classes.notification}>
                        <section>Уведомления о задолженностях</section>
                        <NotificationPushAllStudents />
                    </section>
                }
                {
                    my.role === 'admin'
                        &&
                    <section>
                        <ChangeAllStudentsPayment onSuccess={() => setTrigger(!trigger)} />
                    </section>
                }
            </section>
        </Dropdown>
    )
}
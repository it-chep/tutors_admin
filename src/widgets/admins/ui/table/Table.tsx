import { FC } from "react";
import classes from './table.module.scss'
import { MyButton } from "../../../../shared/ui/button";
import { useNavigate } from "react-router-dom";
import { AdminItem, IAdmin } from "../../../../entities/admin";

interface IProps{
    admins: IAdmin[];
}

export const Table: FC<IProps> = ({admins}) => {

    const router = useNavigate()

    return (
        <table className={classes.table}>
            <thead>
                <tr className={classes.item}>
                    <th>ID</th>
                    <th>ФИО</th>
                    <th>Телеграм</th>
                </tr>
            </thead>
            <tbody>
                {admins.map(admin => 
                    <AdminItem
                        key={admin.id}
                        admin={admin}
                    >
                        <MyButton onClick={() => router('/admin/' + admin.id)}>
                            Подробнее
                        </MyButton>
                    </AdminItem>
                )}
            </tbody>
        </table>
    )
}
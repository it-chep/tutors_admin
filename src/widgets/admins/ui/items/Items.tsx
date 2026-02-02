import { FC } from "react";
import classes from './items.module.scss'
import { MyButton } from "../../../../shared/ui/button";
import { useNavigate } from "react-router-dom";
import { AdminItemMobile, IAdmin } from "../../../../entities/admin";

interface IProps{
    admins: IAdmin[];
}

export const Items: FC<IProps> = ({admins}) => {

    const router = useNavigate()

    return (
        <section className={classes.items}>
            {admins.map(admin => 
                <AdminItemMobile
                    key={admin.id}
                    admin={admin}
                >
                    <MyButton onClick={() => router('/admin/' + admin.id)}>
                        Подробнее
                    </MyButton>
                </AdminItemMobile>
            )}
        </section>
    )
}
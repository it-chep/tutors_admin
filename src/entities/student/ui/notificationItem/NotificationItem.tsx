import { FC } from "react";
import { INotifications } from "../../model/types";
import classes from './notificationItem.module.scss'
import { formatUtcToMsk } from "../../../../shared/lib/helpers/formatUtcToMsk";


interface IProps {
    notification: INotifications;
}

export const NotificationItem: FC<IProps> = ({notification}) => {

    return (
        <tr 
            className={classes.item}
        >
            <td>
                {formatUtcToMsk(notification.created_at)} (мск)
            </td>  
        </tr>
       )
}

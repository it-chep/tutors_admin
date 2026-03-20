import { FC } from "react";
import { INotification } from "../../model/types";
import classes from './notificationItem.module.scss'
import { formatUtcToMsk } from "../../../../shared/lib/helpers/formatUtcToMsk";


interface IProps {
    notification: INotification;
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

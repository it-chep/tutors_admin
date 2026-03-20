import { FC} from "react";
import classes from './tutorAccrual.module.scss'
import { OpenContainer } from "../../../features/openContainer";
import { TutorDownloadReceipts } from "../../../features/tutorDownloadReceipts";
import { AddAccrualTutor } from "../../../features/addAccrualTutor";

interface IProps {
    tutorId: number;
}

export const TutorAccrual: FC<IProps> = ({tutorId}) => {

    return (
        <section className={classes.container}>
            <OpenContainer title="Выплаты">
                <section className={classes.content}>
                    <AddAccrualTutor
                        tutorId={tutorId}
                    />
                    <TutorDownloadReceipts 
                        tutorId={tutorId}
                    />
                </section>
            </OpenContainer>
        </section>
    )
}
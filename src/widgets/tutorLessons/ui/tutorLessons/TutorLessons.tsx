import { FC } from "react";
import classes from './tutorLessons.module.scss'
import { OpenContainer } from "../../../../features/openContainer";
import { Content } from "../content/Content";

interface IProps {
    isOpen?: boolean;
    tutorId?: number;
}

export const TutorLessons: FC<IProps> = ({isOpen, tutorId}) => {

    return (
        !isOpen 
            ?
        <section className={classes.container}>
            <section className={classes.title}>Занятия</section>
            <Content />
        </section>
            :
        <section className={`${classes.container} ${classes.isOpen}`}>
            <OpenContainer title="Занятия">
                <section className={classes.content}>
                    <Content tutorId={tutorId} />
                </section>
            </OpenContainer>
        </section>
    )
}
import { FC } from "react";
import classes from './section.module.scss'
import { Link } from "react-router-dom";


interface IProps {
    section: {
        title: string;
        link: string;
    }
}

export const Section: FC<IProps> = ({section}) => {


    return (
        <Link  
            to={section.link}
            className={classes.link}
        >
            {section.title}
        </Link>
    )
}
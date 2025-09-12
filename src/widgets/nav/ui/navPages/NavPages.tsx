import { FC } from "react";
import { sections } from "../../lib/const/sections";
import { Link, useLocation } from "react-router-dom";
import { ISection } from "../../model/types";
import classes from './navPages.module.scss'



export const NavPages: FC = () => {

    const links: ISection['sections'] = [{title: 'Главная', link: '/'}]

    sections.forEach(section => section.sections.forEach(s => links.push(s)))

    const {pathname} = useLocation()

    return (
        <nav className={classes.navPages}>
            <ul className={classes.list}>
                {links.map(link => 
                    <li 
                        className={classes.link + (pathname === link.link ? ` ${classes.selected}` : '')} 
                        key={link.title}
                    >
                        <Link to={link.link}>
                            <span className={classes.linkVisible}>{link.title}</span>
                            <span className={classes.linkNotVisible}>{link.title}</span>
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    )
}
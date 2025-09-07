import { FC, PropsWithChildren } from "react";
import { NavPages } from "../../widgets/nav";
import classes from './layoutPages.module.scss'


interface IProps {
    title: string;
}

export const LayoutPages: FC<IProps & PropsWithChildren> = ({title, children}) => {

    return (
        <section className={classes.wrapper}>
            <header className={classes.header}>
                {title}
            </header>
            <section className={classes.container}>
                <section className={classes.nav}>
                    <NavPages />
                </section>
                <main className={classes.main}>
                    {children}
                </main>
            </section>
        </section>
    )
}
import { FC, PropsWithChildren } from "react";
import { NavMobile, NavPages } from "../../widgets/nav";
import classes from './layoutPages.module.scss'

interface IProps {
    title: string;
}

export const LayoutPages: FC<IProps & PropsWithChildren> = ({title, children}) => {

    return (
        <>
            <header className={classes.header}>
                {title}
                <section className={classes.burger}>
                    <NavMobile />
                </section>
            </header>
            <section className={classes.nav}>
                <section className={classes.navWrapper}>
                    <NavPages />
                </section>
            </section>
            <section className={classes.container}>
                <main className={classes.main}>
                    {children}
                </main>
            </section>
        </>
    )
}
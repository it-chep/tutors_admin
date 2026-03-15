import classes from './spasibo.module.scss'

export default function SpasiboPage() {
    return (
        <section className={classes.wrapper}>
            <section className={classes.card}>
                <section className={classes.title}>
                    Спасибо за оплату
                </section>
                <section className={classes.text}>
                    Мы получили ваш платеж и уже обрабатываем его.
                </section>
            </section>
        </section>
    )
}

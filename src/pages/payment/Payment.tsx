import { useParams } from 'react-router-dom'
import { Payment } from '../../features/payment'
import classes from './payment.module.scss'

export default function PaymentPage() {

    const {hash} = useParams<{hash: string}>()

    if(!hash){
        return (<></>)
    }

    return (
        <section className={classes.wrapper}>
            <Payment hash={hash} />
        </section>
    )
}
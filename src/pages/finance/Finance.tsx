import { useEffect } from 'react'
import { FINANCE_ROUTE, HOME_ROUTE } from '../../app/router/routes'
import { useAppSelector } from '../../app/store/store'
import { FinanceWidget } from '../../widgets/finance'
import { LayoutPages } from '../layoutPages'
import { useNavigate } from 'react-router-dom'


export default function FinancePage() {

    const {my} = useAppSelector(s => s.myReducer)
    const router = useNavigate()

    const access = my.role === 'admin'

    useEffect(() => {
        if(!access){
            router(HOME_ROUTE.path)
        }
    }, [])

    return (
        access
            ?
        <LayoutPages title={FINANCE_ROUTE.name}>
            <FinanceWidget />
        </LayoutPages>
            :
        <></>
    )
}
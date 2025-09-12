import { TUTOR_CREATE_ROUTE } from '../../app/router/routes'
import { LayoutPages } from '../layoutPages'
import { AdminChange } from '../../features/adminChange'


export default function AdminChangePage() {


    return (
        <LayoutPages title={TUTOR_CREATE_ROUTE.name}>
            <AdminChange />
        </LayoutPages>
    )
}
import { LayoutPages } from "../../layoutPages";
import { HOME_ROUTE, TUTOR_CREATE_ROUTE, TUTORS_ARCHIVE_ROUTE, TUTORS_ROUTE } from "../../../app/router/routes";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import classes from './tutorsLayout.module.scss'
import { SwitchButton } from "../../../shared/ui/switchButton";
import { useAppSelector } from "../../../app/store/store";
import { TutorFilters } from "../../../features/tutorFilters";
import { HintWrap } from "../../../widgets/tutors";
import { MyButton } from "../../../shared/ui/button";
import { TRole } from "../../../entities/my";
import { AdminDownloadTutors } from "../../../widgets/adminDownloadTutors";

const roles: TRole[] = ['super_admin', 'admin', 'assistant'] 

export default function TutorsLayoutPage() {
    
    const {my} = useAppSelector(s => s.myReducer)
    const isAccess = roles.includes(my.role)
    
    const {pathname} = useLocation()
    const router = useNavigate()

    const title = pathname === TUTORS_ROUTE.path ? TUTORS_ROUTE.name : TUTORS_ARCHIVE_ROUTE.name;

    const isTutors = pathname === TUTORS_ROUTE.path;

    const onSwitchPage = (selectedPage: 1 | 2) => {
        if(selectedPage === 1) {
            router(TUTORS_ROUTE.path)
        }
        else {
            router(TUTORS_ARCHIVE_ROUTE.path)
        }
    }

    if(!isAccess){
        return (
            <Navigate to={HOME_ROUTE.path} replace />
        )
    }

    return (
        <LayoutPages title={title}>
            <section className={classes.header}>
                {
                    my.paid_functions['tutor_archive']
                        &&
                    <section className={classes.switchButton}>
                        <SwitchButton
                            text1="Репетиторы"
                            text2="Архив репетиторов"
                            onSelected={onSwitchPage}
                            selected={isTutors ? 1 : 2}
                        />
                    </section>
                }
                <section className={classes.wrap}>
                    {
                        isTutors
                            &&
                        <>
                        <section className={classes.hint}>
                            <HintWrap />
                        </section>
                        <section className={classes.add}>
                            <MyButton onClick={() => router(TUTOR_CREATE_ROUTE.path)}>
                                Добавить репетитора
                            </MyButton>
                        </section>
                        </>
                    }
                </section>
            </section>
            {
                my.paid_functions['tutor_filter_by_tg']
                    &&
                <section className={classes.filter}>
                    <TutorFilters />
                </section>
            }
            {
                isTutors
                    &&
                <section className={classes.adminDownloadTutors}>
                    <AdminDownloadTutors />
                </section>
            }
            <section className={classes.tutors}>
                <Outlet />
            </section>
        </LayoutPages>
    )
}

import { ADMIN_LESSONS_ROUTE, ADMIN_TRANSACTIONS_ROUTE, ADMINS_ROUTE, ASSISTANTS_ROUTE, FINANCE_ROUTE, 
    STUDENTS_ROUTE, TUTOR_LESSONS_ROUTE, TUTORS_ROUTE, TUTOR_ACCRUALS_ROUTE, 
    TUTOR_FINANCE_ROUTE} from "../../../../app/router/routes";
import { IMy } from "../../../../entities/my";
import { ISection } from "../../model/types";


export const getSections = (my: IMy): ISection[] => {
    
    const paths: ISection[] = []

    if(my.role === 'admin' || my.role === 'super_admin' || my.role === 'assistant'){
        paths.push(
            {
                title: STUDENTS_ROUTE.name,
                link: STUDENTS_ROUTE.path
            },
            {
                title: TUTORS_ROUTE.name,
                link: TUTORS_ROUTE.path
            }
        )
        if(my.role === 'admin' || my.role === 'assistant'){
            paths.push(
                {
                    title: FINANCE_ROUTE.name,
                    link: FINANCE_ROUTE.path
                },
                {
                    title: ADMIN_LESSONS_ROUTE.name,
                    link: ADMIN_LESSONS_ROUTE.path
                }
            )
        }
        if(my.role === 'admin'){
            paths.push(
                {
                    title: ADMIN_TRANSACTIONS_ROUTE.name,
                    link: ADMIN_TRANSACTIONS_ROUTE.path
                }
            )
        }
        if(my.role === 'admin' && my.paid_functions['assistant']){
            paths.push(
                {
                    title: ASSISTANTS_ROUTE.name,
                    link: ASSISTANTS_ROUTE.path
                }
            )
        }
        if(my.role === 'assistant' && my.paid_functions['can_penalize_assistants']){
            paths.push(
                {
                    title: ASSISTANTS_ROUTE.name,
                    link: ASSISTANTS_ROUTE.path
                },
            )
        }
        if(my.role === 'super_admin'){
            paths.push(
                {
                    title: ADMINS_ROUTE.name,
                    link: ADMINS_ROUTE.path
                }
            )
        }
    }
    if(my.role === 'tutor'){
        paths.push(
            {
                title: STUDENTS_ROUTE.name,
                link: STUDENTS_ROUTE.path
            },
            {
                title: TUTOR_LESSONS_ROUTE.name,
                link: TUTOR_LESSONS_ROUTE.path
            },
            {
                title: TUTOR_ACCRUALS_ROUTE.name,
                link: TUTOR_ACCRUALS_ROUTE.path
            },
            {
                title: TUTOR_FINANCE_ROUTE.name,
                link: TUTOR_FINANCE_ROUTE.path
            }
        )
    }

    return paths
}
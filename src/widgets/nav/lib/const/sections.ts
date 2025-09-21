import { ADMINS_ROUTE, FINANCE_ROUTE, STUDENTS_ROUTE, TUTORS_ROUTE } from "../../../../app/router/routes";
import { IMy } from "../../../../entities/my";
import { ISection } from "../../model/types";


export const getSections = (my: IMy): ISection[] => {
    
    const paths: ISection[] = []

    if(my.role === 'admin' || my.role === 'super_admin'){
        paths.push(
            {
                title: 'Студенты',
                sections: [
                    {
                        title: STUDENTS_ROUTE.name,
                        link: STUDENTS_ROUTE.path
                    }
                ]
            },
            {
                title: 'Репетиторы',
                sections: [
                    {
                        title: TUTORS_ROUTE.name,
                        link: TUTORS_ROUTE.path
                    }
                ]
            },
        )
        if(my.role === 'admin'){
            paths.push(
                {
                    title: 'Финансы',
                    sections: [
                        {
                            title: FINANCE_ROUTE.name,
                            link: FINANCE_ROUTE.path
                        }
                    ]
                }
            )
        }
        if(my.role === 'super_admin'){
            paths.push(
                {
                    title: 'Админы',
                    sections: [
                        {
                            title: ADMINS_ROUTE.name,
                            link: ADMINS_ROUTE.path
                        }
                    ]
                }
            )
        }
    }
    if(my.role === 'tutor'){
        paths.push(
            {
                title: 'Студенты',
                sections: [
                    {
                        title: STUDENTS_ROUTE.name,
                        link: STUDENTS_ROUTE.path
                    }
                ]
            }
        )
    }

    return paths
}
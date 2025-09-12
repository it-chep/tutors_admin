import { FINANCE_ROUTE, STUDENTS_ROUTE, TUTORS_ROUTE } from "../../../../app/router/routes";
import { IMy } from "../../../../entities/my";
import { ISection } from "../../model/types";


export const getSections = (my: IMy): ISection[] => {
    
    switch (my.role){
        case 'admin': 
            return ([
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
                {
                    title: 'Финансы',
                    sections: [
                        {
                            title: FINANCE_ROUTE.name,
                            link: FINANCE_ROUTE.path
                        }
                    ]
                }
            ])
        case 'tutor':
            return ([
                {
                    title: 'Студенты',
                    sections: [
                        {
                            title: STUDENTS_ROUTE.name,
                            link: STUDENTS_ROUTE.path
                        }
                    ]
                },
            ])
        case 'super_admin':
            return []
    }

}
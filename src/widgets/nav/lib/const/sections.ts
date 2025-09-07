import { STUDENTS_ROUTE } from "../../../../app/router/routes";
import { ISection } from "../../model/types";




export const sections: ISection[] = [
    {
        title: 'Студенты',
        sections: [
            {
                title: STUDENTS_ROUTE.name,
                link: STUDENTS_ROUTE.path
            }
        ]
    },
]
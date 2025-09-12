import { RouteObject } from "react-router-dom";
import { FINANCE_ROUTE, HOME_ROUTE, LOGIN_ROUTE, STUDENT_CREATE_ROUTE, STUDENT_ROUTE, STUDENTS_ROUTE, TUTOR_CREATE_ROUTE, TUTOR_ROUTE, TUTORS_ROUTE } from "./routes";
import App from "../../App";
import HomePage from "../../pages/home/HomePage";
import AuthPage from "../../pages/auth/AuthPage";
import StudentsPage from "../../pages/students/Students";
import StudentChangePage from "../../pages/studentChange/StudentChange";
import StudentPage from "../../pages/student/Student";
import TutorsPage from "../../pages/tutors/Tutors";
import TutorPage from "../../pages/tutor/Tutor";
import TutorChangePage from "../../pages/tutorChange/TutorChange";
import FinancePage from "../../pages/finance/Finance";


export const Router: RouteObject[] = [
    {
        path: HOME_ROUTE.path,
        Component: App,
        // ErrorBoundary: NotFound,
        children: [
            {
                path: HOME_ROUTE.path,
                Component: HomePage
            },
            {
                path: LOGIN_ROUTE.path,
                Component: AuthPage
            },
            {
                path: STUDENTS_ROUTE.path,
                Component: StudentsPage
            },
            {
                path: STUDENT_CREATE_ROUTE.path,
                Component: StudentChangePage
            },
            {
                path: STUDENT_ROUTE.path,
                Component: StudentPage
            },
            {
                path: TUTORS_ROUTE.path,
                Component: TutorsPage
            },
            {
                path: TUTOR_ROUTE.path,
                Component: TutorPage
            },
            {
                path: TUTOR_CREATE_ROUTE.path,
                Component: TutorChangePage
            },
            {
                path: FINANCE_ROUTE.path,
                Component: FinancePage
            }
        ]
    }
]
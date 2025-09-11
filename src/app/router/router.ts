import { RouteObject } from "react-router-dom";
import { HOME_ROUTE, LOGIN_ROUTE, STUDENT_CREATE_ROUTE, STUDENT_ROUTE, STUDENTS_ROUTE, TUTORS_ROUTE } from "./routes";
import App from "../../App";
import HomePage from "../../pages/home/HomePage";
import AuthPage from "../../pages/auth/AuthPage";
import StudentsPage from "../../pages/students/Students";
import StudentChangePage from "../../pages/studentChange/StudentChange";
import StudentPage from "../../pages/student/Student";
import TutorsPage from "../../pages/tutors/Tutors";


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
            }
        ]
    }
]
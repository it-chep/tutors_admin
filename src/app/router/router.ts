import { RouteObject } from "react-router-dom";
import { HOME_ROUTE, LOGIN_ROUTE, STUDENT_CREATE_ROUTE, STUDENTS_ROUTE } from "./routes";
import App from "../../App";
import HomePage from "../../pages/home/HomePage";
import AuthPage from "../../pages/auth/AuthPage";
import StudentsPage from "../../pages/students/Students";
import StudentChangePage from "../../pages/studentChange/StudentChange";


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
            }
        ]
    }
]
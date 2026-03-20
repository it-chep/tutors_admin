import { RouteObject } from "react-router-dom";
import { ADMIN_CREATE_ROUTE, ADMIN_LESSONS_ROUTE, ADMIN_ROUTE, ADMIN_TRANSACTIONS_ROUTE, ADMINS_ROUTE,
    ASSISTANT_CREATE_ROUTE, ASSISTANT_ROUTE, ASSISTANTS_ROUTE, AUTH_ROUTE, FINANCE_ROUTE,
    HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, STUDENT_CREATE_ROUTE, STUDENT_PAYMENT_ROUTE, STUDENT_ROUTE,
    STUDENT_UPDATE_ROUTE, STUDENTS_ARCHIVE_ROUTE, STUDENTS_ROUTE, TUTOR_CREATE_ROUTE, TUTOR_LESSONS_ROUTE,
    TUTOR_ROUTE, TUTOR_UPDATE_ROUTE, TUTORS_ARCHIVE_ROUTE, TUTORS_ROUTE, TUTOR_ACCRUALS_ROUTE, 
    TUTOR_FINANCE_ROUTE, THANK_YOU_ROUTE } from "./routes";
import {RouteObject} from "react-router-dom";
import App from "../../App";
import HomePage from "../../pages/home/HomePage";
import AuthPage from "../../pages/auth/auth/AuthPage";
import StudentsPage from "../../pages/students/students/Students";
import StudentChangePage from "../../pages/studentChange/StudentChange";
import StudentPage from "../../pages/student/Student";
import TutorsLayoutPage from "../../pages/tutors/layout/TutorsLayout";
import TutorsPage from "../../pages/tutors/tutors/Tutors";
import TutorsArchivePage from "../../pages/tutors/archive/TutorsArchive";
import TutorPage from "../../pages/tutor/Tutor";
import TutorChangePage from "../../pages/tutorChange/TutorChange";
import FinancePage from "../../pages/finance/Finance";
import AdminsPage from "../../pages/admins/Admins";
import AdminPage from "../../pages/admin/Admin";
import AdminChangePage from "../../pages/adminChange/AdminChange";
import AuthLayoutPage from "../../pages/auth/layout/AuthLayout";
import AuthVerifyPage from "../../pages/auth/verify/AuthVerifyPage";
import NotFoundPage from "../../pages/notFound/NotFound";
import TutorLessonsPage from "../../pages/tutorLessons/TutorLessons";
import AdminTransactionsPage from "../../pages/adminTransactions/AdminTransactions";
import AdminLessonsPage from "../../pages/adminLessons/AdminLessons";
import StudentsArchivePage from "../../pages/students/archive/StudentsArchive";
import AssistantsPage from "../../pages/assistants/Assistants";
import AssistantCreatePage from "../../pages/assistantCreate/AssistantCreate";
import AssistantPage from "../../pages/assistant/Assistant";
import PaymentPage from "../../pages/payment/Payment";
import StudentsLayoutPage from "../../pages/students/layout/StudentsLayout";
import TutorAccrualsPage from "../../pages/tutorAccruals/TutorAccruals";
import TutorFinancePage from "../../pages/tutorFinance/TutorFinance";
import SpasiboPage from "../../pages/spasibo/Spasibo";


export const Router: RouteObject[] = [
    {
        path: HOME_ROUTE.path,
        Component: App,
        ErrorBoundary: NotFoundPage,
        children: [
            {
                path: HOME_ROUTE.path,
                Component: HomePage
            },
            {
                path: AUTH_ROUTE.path,
                Component: AuthLayoutPage,
                children: [
                    {
                        path: AUTH_ROUTE.path,
                        Component: AuthPage,
                    },
                    {
                        path: LOGIN_ROUTE.path,
                        Component: AuthVerifyPage
                    },
                    {
                        path: REGISTRATION_ROUTE.path,
                        Component: AuthVerifyPage
                    }
                ]
            },
            {
                path: STUDENTS_ROUTE.path,
                Component: StudentsLayoutPage,
                children: [
                    {
                        path: STUDENTS_ARCHIVE_ROUTE.path,
                        Component: StudentsArchivePage
                    },
                    {
                        path: STUDENTS_ROUTE.path,
                        Component: StudentsPage
                    },
                ]
            },
            {
                path: STUDENT_CREATE_ROUTE.path,
                Component: StudentChangePage
            },
            {
                path: STUDENT_UPDATE_ROUTE.path,
                Component: StudentChangePage
            },
            {
                path: STUDENT_ROUTE.path,
                Component: StudentPage
            },
            {
                path: TUTOR_FINANCE_ROUTE.path,
                Component: TutorFinancePage
            },
            {
                path: TUTORS_ROUTE.path,
                Component: TutorsLayoutPage,
                children: [
                    {
                        path: TUTORS_ARCHIVE_ROUTE.path,
                        Component: TutorsArchivePage
                    },
                    {
                        path: TUTORS_ROUTE.path,
                        Component: TutorsPage
                    },
                ]
            },
            {
                path: TUTOR_ACCRUALS_ROUTE.path,
                Component: TutorAccrualsPage
            },
            {
                path: TUTOR_UPDATE_ROUTE.path,
                Component: TutorChangePage
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
            },
            {
                path: ADMINS_ROUTE.path,
                Component: AdminsPage
            },
            {
                path: ADMIN_ROUTE.path,
                Component: AdminPage
            },
            {
                path: ADMIN_CREATE_ROUTE.path,
                Component: AdminChangePage
            },
            {
                path: TUTOR_LESSONS_ROUTE.path,
                Component: TutorLessonsPage
            },
            {
                path: ADMIN_TRANSACTIONS_ROUTE.path,
                Component: AdminTransactionsPage
            },
            {
                path: ADMIN_LESSONS_ROUTE.path,
                Component: AdminLessonsPage
            },
            {
                path: ASSISTANTS_ROUTE.path,
                Component: AssistantsPage
            },
            {
                path: ASSISTANT_CREATE_ROUTE.path,
                Component: AssistantCreatePage
            },
            {
                path: ASSISTANT_ROUTE.path,
                Component: AssistantPage
            },
            {
                path: STUDENT_PAYMENT_ROUTE.path,
                Component: PaymentPage
            },
            {
                path: THANK_YOU_ROUTE.path,
                Component: SpasiboPage
            }
        ]
    }
]

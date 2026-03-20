import { IRoute } from "./types";

export const HOME_ROUTE: IRoute = {
    name: 'Главная',
    path: '/',
}

// AUTH

export const AUTH_ROUTE: IRoute = {
    name: 'Вход',
    path: '/auth'
}

export const LOGIN_ROUTE: IRoute = {
    name: 'Вход',
    path: '/auth/login'
}

export const REGISTRATION_ROUTE: IRoute = {
    name: 'Вход',
    path: '/auth/registration'
}



// TUTOR

export const TUTOR_LESSONS_ROUTE: IRoute = {
    name: 'Занятия',
    path: '/tutor_lessons'
}

export const TUTORS_ROUTE: IRoute = {
    name: 'Репетиторы',
    path: '/tutors'
}

export const TUTOR_ROUTE: IRoute = {
    name: 'Репетитор',
    path: '/tutor/:id'
}

export const TUTOR_ACCRUALS_ROUTE: IRoute = {
    name: 'Выплаты',
    path: '/tutor_accruals'
}

export const TUTOR_CREATE_ROUTE: IRoute = {
    name: 'Репетиторы',
    path: '/tutor/create'
}

export const TUTOR_UPDATE_ROUTE: IRoute = {
    name: 'Репетиторы',
    path: '/tutor/update'
}

export const TUTORS_ARCHIVE_ROUTE: IRoute = {
    name: 'Архив репетиторов',
    path: '/tutors/archive'
}

export const TUTOR_FINANCE_ROUTE: IRoute = {
    name: 'Финансы',
    path: '/tutor_finance'
}



// STUDENTS

export const STUDENTS_ROUTE: IRoute = {
    name: 'Студенты',
    path: '/students'
}

export const STUDENTS_ARCHIVE_ROUTE: IRoute = {
    name: 'Архив студентов',
    path: '/students/archive'
}

export const STUDENT_CREATE_ROUTE: IRoute = {
    name: 'Студенты',
    path: '/student/create'
}

export const STUDENT_PAYMENT_ROUTE: IRoute = {
    name: 'Оплата',
    path: '/payment/:hash'
}

export const STUDENT_UPDATE_ROUTE: IRoute = {
    name: 'Студенты',
    path: '/student/update'
}

export const STUDENT_ROUTE: IRoute = {
    name: 'Студент',
    path: '/student/:id'
}



// ADMIN

export const ADMINS_ROUTE: IRoute = {
    name: 'Админы',
    path: '/admins'
}

export const ADMIN_ROUTE: IRoute = {
    name: 'Админ',
    path: '/admin/:id'
}

export const ADMIN_CREATE_ROUTE: IRoute = {
    name: 'Админы',
    path: '/admin/create'
}



// ASSISTANT

export const ASSISTANTS_ROUTE: IRoute = {
    name: 'Ассистенты',
    path: '/assistants'
}

export const ASSISTANT_ROUTE: IRoute = {
    name: 'Ассистент',
    path: '/assistant/:id'
}

export const ASSISTANT_CREATE_ROUTE: IRoute = {
    name: 'Ассистенты',
    path: '/assistant/create'
}




export const ADMIN_TRANSACTIONS_ROUTE: IRoute = {
    name: 'Транзакции',
    path: '/transactions'
}

export const ADMIN_LESSONS_ROUTE: IRoute = {
    name: 'Занятия',
    path: '/lessons'
}

export const FINANCE_ROUTE: IRoute = {
    name: 'Финансы',
    path: '/finance'
}
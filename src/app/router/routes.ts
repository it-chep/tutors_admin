import { IRoute } from "./types";

export const HOME_ROUTE: IRoute = {
    name: 'Главная',
    path: '/',
}

export const LOGIN_ROUTE: IRoute = {
    name: 'Вход',
    path: '/login'
}


export const STUDENTS_ROUTE: IRoute = {
    name: 'Студенты',
    path: '/students'
}

export const STUDENT_CREATE_ROUTE: IRoute = {
    name: 'Студенты',
    path: '/student/create'
}

export const STUDENT_ROUTE: IRoute = {
    name: 'Студент',
    path: '/student/:id'
}


export const TUTORS_ROUTE: IRoute = {
    name: 'Репетиторы',
    path: '/tutors'
}


export const TUTOR_ROUTE: IRoute = {
    name: 'Репетитор',
    path: '/tutor/:id'
}


export const TUTOR_CREATE_ROUTE: IRoute = {
    name: 'Репетиторы',
    path: '/tutor/create'
}

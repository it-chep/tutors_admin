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

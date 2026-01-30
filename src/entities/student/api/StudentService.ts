import { fetchAuth } from "../../../shared/api/ApiService"
import { ILesson, INotifications, IStudent, IStudentChange, IStudentData, 
    IStudentFinance, ITransactions } from "../model/types"



class StudentService {

    controller: AbortController | null
    constructor(){
        this.controller = null;
    }

    async create(student: IStudentChange){
        await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/students', {
            method: "POST",
            body: JSON.stringify(student)
        })
    }

    async update(student: IStudentChange){
        await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/students/' + student.id, {
            method: "POST",
            body: JSON.stringify(student)
        })
    }

    async getAllByTutor(id: number): Promise<{students: IStudent[], students_count: number}>{
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + `/students?tutor_id=${id}`)
        const {students, students_count}: {students: IStudent[], students_count: number} = await res.json()
        return {students, students_count}
    }

    async move(old_tutor_id: number, new_tutor_id: number, student_id?: number) {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + `/students/move`, {
            method: "POST",
            body: JSON.stringify({
                old_tutor_id,
                new_tutor_id,
                student_id
            })
        })
    }

    async getFinance(id: number, from: string, to: string): Promise<IStudentFinance> {
        if(this.controller){
            this.controller.abort()
        }
        this.controller = new AbortController()
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/students/' + id + '/finance', {
            method: "POST",
            body: JSON.stringify({
                from,
                to
            }),
            signal: this.controller.signal
        })
        const {data}: {data: IStudentFinance} = await res.json()
        this.controller = null;
        return data
    }

    async get(id: number): Promise<IStudentData>{
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/students/' + id)
        const {student}: {student: IStudentData} = await res.json()
        return student
    }

    async delete(id: number){
        await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/students/' + id, {
            method: "DELETE"
        })
    }

    async getTgAdmins(): Promise<string[]> {
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/students/tg_admins_usernames')
        const {tg_admins}: {tg_admins: string[]} = await res.json()
        return tg_admins
    }

    async getAll(): Promise<{students: IStudent[], students_count: number}> {
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/students')
        const {students, students_count}: {students: IStudent[], students_count: number} = await res.json()
        return {students, students_count}
    }

    async getArchiveAll(): Promise<{students: IStudent[], students_count: number}> {
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/students/archive')
        const {students, students_count}: {students: IStudent[], students_count: number} = await res.json()
        return {students, students_count}
    }

    async getAllByFilters(tg_admins_usernames: string[], is_lost: boolean, is_archive?: boolean): Promise<{students: IStudent[], students_count: number}> {
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/students/filter', {
            method: 'POST',
            body: JSON.stringify({tg_admins_usernames, is_lost, is_archive})
        })
        const {students, students_count}: {students: IStudent[], students_count: number} = await res.json()
        return {students, students_count}
    }

    async changeWallet(id: number, balance: string){
        await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/students/' + id + '/wallet', {
            method: "POST",
            body: JSON.stringify({student_id: id, balance})
        })
    }
    
    async changeLesson(id: number, date: string, duration: number){
        await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/lessons/' + id, {
            method: "POST",
            body: JSON.stringify({date, duration})
        })
    }
        
    async archive(id: number){
        await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/students/' + id + '/archive', {
            method: "POST",
        })
    }

    async unarchive(id: number){
        await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/students/' + id + '/unarchive', {
            method: "POST",
        })
    }

    async getLessons(id: number, from: string, to: string): Promise<{lessons: ILesson[], lessons_count: number}> {
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/students/' + id + '/lessons', {
            method: "POST",
            body: JSON.stringify({from, to})
        })
        const {lessons, lessons_count}: {lessons: ILesson[], lessons_count: number} = await res.json()
        return {lessons, lessons_count}
    }

    async deleteLesson(id: number){
        await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/lessons/' + id, {
            method: "DELETE"
        })
    }

    async notificationPush(id: number){
        await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/students/' + id + '/notifications/push', {
            method: 'POST'
        })
    }

    async notificationPushAllStudents(){
        await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/students/push_all_students', {
            method: 'POST'
        })
    }

    async transactions(id: number, from: string, to: string): Promise<{transactions: ITransactions[], transactions_count: number}>{
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/students/' + id + '/transactions', {
            method: "POST",
            body: JSON.stringify({from, to})
        })
        const {transactions, transactions_count}: {transactions: ITransactions[], transactions_count: number} = await res.json()
        return {transactions, transactions_count}
    }

    async notifications(id: number, from: string, to: string): Promise<{notifications: INotifications[], notifications_count: number}>{
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/students/' + id + '/notifications', {
            method: "POST",
            body: JSON.stringify({from, to})
        })
        const {notifications, notifications_count}: {notifications: INotifications[], notifications_count: number} = await res.json()
        return {notifications, notifications_count}
    }

    async changePayment(studentId: number, new_payment_id: number){
        await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + `/students/${studentId}/change_payment`, {
            method: "POST",
            body: JSON.stringify({new_payment_id})
        })
    }
}

export const studentService = new StudentService()
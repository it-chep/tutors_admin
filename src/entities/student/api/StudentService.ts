import { fetchAuth } from "../../../shared/api/ApiService"
import { ILesson, INotifications, IStudent, IStudentChange, IStudentData,
    IStudentFinance, ITgAdminUsername, ITransactions } from "../model/types"



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

    async payment(hash: string, amount: string){
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL + '/payment/' + hash, {
            method: "POST",
            body: JSON.stringify({amount})
        })
        const data = await res.json();

        if (data.payment_url) {
            window.location.href = data.payment_url;
        } else {
            throw new Error('No payment URL received');
        }
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

    async getTgAdmins(): Promise<ITgAdminUsername[]> {
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/students/tg_admins_usernames')
        const {tg_admins}: {tg_admins: ITgAdminUsername[]} = await res.json()
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

    async getAllByFilters(tg_admins_usernames_ids: number[], is_lost: boolean, is_archive?: boolean, payment_ids?: number[]): Promise<{students: IStudent[], students_count: number}> {
        const body: Record<string, unknown> = {tg_admins_usernames_ids, is_lost, is_archive}
        if(payment_ids && payment_ids.length > 0) body.payment_ids = payment_ids
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/students/filter', {
            method: 'POST',
            body: JSON.stringify(body)
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

    async getLessons(id: number, from: string, to: string): Promise<{lessons: ILesson[], lessons_count: number, total_hours: number}> {
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/students/' + id + '/lessons', {
            method: "POST",
            body: JSON.stringify({from, to})
        })
        const {lessons, lessons_count, total_hours}: {lessons: ILesson[], lessons_count: number, total_hours: number} = await res.json()
        return {lessons, lessons_count, total_hours: total_hours ?? 0}
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

    async transactions(id: number, from: string, to: string): Promise<{transactions: ITransactions[], transactions_count: number, total_confirmed_amount: string}>{
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/students/' + id + '/transactions', {
            method: "POST",
            body: JSON.stringify({from, to})
        })
        const {transactions, transactions_count, total_confirmed_amount}: {transactions: ITransactions[], transactions_count: number, total_confirmed_amount: string} = await res.json()
        return {transactions, transactions_count, total_confirmed_amount: total_confirmed_amount ?? '0'}
    }

    async addManualTransaction(studentId: number, amount: number): Promise<string> {
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/students/' + studentId + '/transactions/manual', {
            method: "POST",
            body: JSON.stringify({amount})
        })
        const {id}: {id: string} = await res.json()
        return id
    }

    async changeAllPayment(payment_id: number): Promise<void> {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/students/change_all_payment', {
            method: "POST",
            body: JSON.stringify({payment_id})
        })
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
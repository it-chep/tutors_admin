import { fetchAuth } from "../../../shared/api/ApiService"
import { ILesson, IStudent, IStudentChange, IStudentData, IStudentFinance } from "../model/types"



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

    async getAll(): Promise<{students: IStudent[], students_count: number}> {
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/students')
        const {students, students_count}: {students: IStudent[], students_count: number} = await res.json()
        return {students, students_count}
    }

    async changeWallet(id: number, balance: string){
        await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/students/' + id + '/wallet', {
            method: "POST",
            body: JSON.stringify({student_id: id, balance})
        })
    }
    
    async changeLesson(id: number, date: string, duration: string){
        await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/lessons/' + id, {
            method: "POST",
            body: JSON.stringify({date, duration})
        })
    }

    async getLessons(id: number, from: string, to: string){
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/students/' + id + '/lessons', {
            method: "POST",
            body: JSON.stringify({from, to})
        })
        const {lessons}: {lessons: ILesson[]} = await res.json()
        return lessons
    }

    async deleteLesson(id: number){
        await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/lessons/' + id, {
            method: "DELETE"
        })
    }

}

export const studentService = new StudentService()
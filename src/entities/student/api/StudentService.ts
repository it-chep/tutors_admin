import { fetchAuth } from "../../../shared/api/ApiService"
import { IStudent, IStudentChange, IStudentData, IStudentFinance } from "../model/types"



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

    async getAllByTutor(id: number): Promise<IStudent[]>{
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + `/students?tutor_id=${id}`)
        const {students}: {students: IStudent[]} = await res.json()
        return students
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

    async getAll(): Promise<IStudent[]> {
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/students')
        const {students}: {students: IStudent[]} = await res.json()
        return students
    }
}

export const studentService = new StudentService()
import { fetchAuth } from "../../../shared/api/ApiService"
import { IStudent, IStudentChange, IStudentData, IStudentFinance } from "../model/types"



class StudentService {

    controller: AbortController | null
    constructor(){
        this.controller = null;
    }

    async create(student: IStudentChange){
        // await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/students', {
        //     method: "POST",
        //     body: JSON.stringify(student)
        // })
    }

    async getAllByTutor(id: number): Promise<IStudent[]>{
        // const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + `/students?tutor_id=${id}`)
        // const {students}: {students: IStudent[]} = await res.json()
        return [
            {
                "id": 1,
                "first_name": "Максим",
                "last_name": "Нечепорук",
                "middle_name": "Алексеевич",
                "tg": "https://t.me/maxim_jordan",
                "is_only_trial_finished": true,
                "is_balance_negative": false,
                "is_newbie": false
            },
            {
                "id": 2,
                "first_name": "Максим",
                "last_name": "Пвввкк",
                "middle_name": "Алексеевич РЕПЕТ",
                "tg": "https://t.me/maxim_jordan",
                "is_only_trial_finished": true,
                "is_balance_negative": true,
                "is_newbie": false
            },
            {
                "id": 3,
                "first_name": "Максим",
                "last_name": "Нечепорук",
                "middle_name": "Алексеевич аавававав аававвааававав",
                "tg": "https://t.me/maxim_jordan",
                "is_only_trial_finished": false,
                "is_balance_negative": false,
                "is_newbie": true
            },
        ]
    }

    async getFinance(id: number, from: string, to: string): Promise<IStudentFinance> {
        if(this.controller){
            this.controller.abort()
        }
        this.controller = new AbortController()
        // const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/students/' + id + '/finance', {
        //     method: "POST",
        //     body: JSON.stringify({
        //         from,
        //         to
        //     }),
        //     signal: this.controller.signal
        // })
        // const {data}: {data: IStudentFinance} = await res.json()
        this.controller = null;
        await new Promise(resolve => setTimeout(resolve, 3000))
        return {
            "count": 10,
            "amount": "23"
        }
    }

    async get(id: number): Promise<IStudentData>{
        // const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/students/' + id)
        // const {student}: {student: IStudentData} = await res.json()
        return {
            "id": 1,
            "first_name": "Максим",
            "last_name": "Нечепорук",
            "middle_name": "Алексеевич",
            "phone": "89826588317",
            "tg": "https://t.me/maxim_jordan",
            "cost_per_hour": "1,500.00",
            "subject_name": "Математика",
            "tutor_name": "Фио репетитора",
            "parent_full_name": "Нечепорук Алексей Владимирович",
            "parent_phone": "89826588317",
            "parent_tg": "https://t.me/maxim_jordan",
            "balance": "1,000.00",
            "is_only_trial_finished": true,
            "is_balance_negative": false,
            "is_newbie": true
        }
    }

    async delete(id: number){
        await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/students/' + id, {
            method: "DELETE"
        })
    }

    async getAll(): Promise<IStudent[]> {
        // const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/students')
        // const {students}: {students: IStudent[]} = await res.json()

        return [
            {
                "id": 1,
                "first_name": "Максим",
                "last_name": "Нечепорук",
                "middle_name": "Алексеевич",
                "tg": "https://t.me/maxim_jordan",
                "is_only_trial_finished": true,
                "is_balance_negative": false,
                "is_newbie": false
            },
            {
                "id": 2,
                "first_name": "Максим",
                "last_name": "Пвввкк",
                "middle_name": "Алексеевич",
                "tg": "https://t.me/maxim_jordan",
                "is_only_trial_finished": true,
                "is_balance_negative": true,
                "is_newbie": false
            },
            {
                "id": 3,
                "first_name": "Максим",
                "last_name": "Нечепорук",
                "middle_name": "Алексеевич аавававав аававвааававав",
                "tg": "https://t.me/maxim_jordan",
                "is_only_trial_finished": false,
                "is_balance_negative": false,
                "is_newbie": true
            },
            
        ]
    }

}

export const studentService = new StudentService()
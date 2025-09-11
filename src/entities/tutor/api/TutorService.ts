import { fetchAuth } from "../../../shared/api/ApiService"
import { ITutor } from "../model/types";



class TutorService {

    controller: AbortController | null
    constructor(){
        this.controller = null;
    }

    // async create(student: IStudentChange){
    //     await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/students', {
    //         method: "POST",
    //         body: JSON.stringify(student)
    //     })
    // }

    // async getFinance(id: number, from: string, to: string): Promise<IStudentFinance> {
    //     if(this.controller){
    //         this.controller.abort()
    //     }
    //     this.controller = new AbortController()
    //     // const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/students/' + id + '/finance', {
    //     //     method: "POST",
    //     //     body: JSON.stringify({
    //     //         from,
    //     //         to
    //     //     }),
    //     //     signal: this.controller.signal
    //     // })
    //     // const {data}: {data: IFinance} = await res.json()
    //     this.controller = null;
    //     await new Promise(resolve => setTimeout(resolve, 3000))
    //     return {
    //         "count": 10,
    //         "amount": "23"
    //     }
    // }

    // async get(id: number): Promise<IStudentData>{
    //     // const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/students/' + id)
    //     // const {student}: {student: IStudentData} = await res.json()
    //     return {
    //         "id": 1,
    //         "first_name": "Максим",
    //         "last_name": "Нечепорук",
    //         "middle_name": "Алексеевич",
    //         "phone": "89826588317",
    //         "tg": "https://t.me/maxim_jordan",
    //         "cost_per_hour": "$1,500.00",
    //         "subject_name": "Математика",
    //         "tutor_name": "Фио репетитора",
    //         "parent_full_name": "Нечепорук Алексей Владимирович",
    //         "parent_phone": "89826588317",
    //         "parent_tg": "https://t.me/maxim_jordan",
    //         "balance": "$1,000.00",
    //         "has_buttons": false,
    //         "is_only_trial_finished": true,
    //         "is_balance_negative": false,
    //         "is_newbie": false
    //     }
    // }

    async getAll(): Promise<ITutor[]> {
        // const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/tutors')
        // const {tutors}: {tutors: ITutor[]} = await res.json()

        // await new Promise(resolve => setTimeout(resolve, 3000))

        return [
            {
                "id": 1,
                "full_name": "Нечепорк Максим Алексеевич",
                "tg": "https://t.me/maxim_jordan",
                "has_balance_negative": true,
                "has_only_trial": false,
                "has_newbie": false
            },
            {
                "id": 2,
                "full_name": "Нечепорк Максим Алексеевич",
                "tg": "https://t.me/maxim_jordan",
                "has_balance_negative": false,
                "has_only_trial": true,
                "has_newbie": false
            },
            {
                "id": 3,
                "full_name": "Бобрито",
                "tg": "https://t.me/maxim_jordan",
                "has_balance_negative": false,
                "has_only_trial": false,
                "has_newbie": false
            },
            {
                "id": 4,
                "full_name": "Нечепорк Максим Алексеевич",
                "tg": "https://t.me/maxim_jordan",
                "has_balance_negative": false,
                "has_only_trial": false,
                "has_newbie": true
            },
        ]
            
    }

}

export const tutorService = new TutorService()
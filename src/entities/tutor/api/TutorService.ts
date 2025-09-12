import { fetchAuth } from "../../../shared/api/ApiService"
import { ITutor, ITutorCreate, ITutorData, ITutorFinance } from "../model/types";



class TutorService {

    controller: AbortController | null
    constructor(){
        this.controller = null;
    }

    async create(tutor: ITutorCreate){
        // await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/tutors', {
        //     method: "POST",
        //     body: JSON.stringify(tutor)
        // })
    }

    async delete(id: number){
        await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/tutors/' + id, {
            method: "DELETE"
        })
    }

    async getFinance(id: number, from: string, to: string): Promise<ITutorFinance> {
        if(this.controller){
            this.controller.abort()
        }
        this.controller = new AbortController()
        // const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/tutors/' + id + '/finance', {
        //     method: "POST",
        //     body: JSON.stringify({
        //         from,
        //         to
        //     }),
        //     signal: this.controller.signal
        // })
        // const {data}: {data: ITutorFinance} = await res.json()
        this.controller = null;
        await new Promise(resolve => setTimeout(resolve, 3000))
        return {
            "conversion": 30,
            "count": 23,
            "amount": "23"
        }
    }

    async get(id: number): Promise<ITutorData>{
        // const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/tutors/' + id)
        // const {tutor}: {tutor: ITutorData} = await res.json()
        return {
            "id": 1,
            "full_name": "Нечепорк Максим Алексеевич",
            "phone": "89826588317",
            "tg": "https://t.me/maxim_jordan",
            "cost_per_hour": "1,500.00",
            "subject_name": "Математика"
        }
    }

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

    async trialLesson(student_id: number){
        console.log(student_id)
        await new Promise(resolve => setTimeout(resolve, 2000))
        // await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/tutors/trial_lesson', {
        //     method: "POST",
        //     body: JSON.stringify({student_id})
        // })
    }

    async  conductLesson(student_id: number, duration: number){
        console.log(student_id, duration)
        await new Promise(resolve => setTimeout(resolve, 2000))
        // await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/tutors/conduct_lesson', {
        //     method: "POST",
        //     body: JSON.stringify({student_id, duration})
        // })
    }

}

export const tutorService = new TutorService()
import { fetchAuth } from "../../../shared/api/ApiService"
import { ILessonTutor, ITutor, ITutorCreate, ITutorData, ITutorFinance } from "../model/types";



class TutorService {

    controller: AbortController | null
    constructor(){
        this.controller = null;
    }

    async create(tutor: ITutorCreate){
        await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/tutors', {
            method: "POST",
            body: JSON.stringify(tutor)
        })
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
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/tutors/' + id + '/finance', {
            method: "POST",
            body: JSON.stringify({
                from,
                to
            }),
            signal: this.controller.signal
        })
        const {data}: {data: ITutorFinance} = await res.json()
        this.controller = null;
        return data
    }

    async getAllByAdmin(id: number): Promise<ITutor[]>{
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + `/tutors?admin_id=${id}`)
        const {tutors}: {tutors: ITutor[]} = await res.json()
        return tutors
    }

    async get(id: number): Promise<ITutorData>{
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/tutors/' + id)
        const {tutor}: {tutor: ITutorData} = await res.json()
        return tutor
    }

    async getAll(): Promise<ITutor[]> {
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/tutors')
        const {tutors}: {tutors: ITutor[]} = await res.json()
        return tutors
    }

    async trialLesson(student_id: number){
        await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/tutors/trial_lesson', {
            method: "POST",
            body: JSON.stringify({student_id})
        })
    }

    async  conductLesson(student_id: number, duration: number){
        await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/tutors/conduct_lesson', {
            method: "POST",
            body: JSON.stringify({student_id, duration})
        })
    }

    async getLessons(id: number, from: string, to: string){
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/tutors/' + id + '/lessons', {
            method: "POST",
            body: JSON.stringify({from, to})
        })
        const {lessons}: {lessons: ILessonTutor[]} = await res.json()
        return lessons
    }

}

export const tutorService = new TutorService()
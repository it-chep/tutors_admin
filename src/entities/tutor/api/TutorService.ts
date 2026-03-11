import { fetchAuth } from "../../../shared/api/ApiService"
import { ILessonTutor, ITutor, ITutorChange, ITutorData, ITutorFinance } from "../model/types";



class TutorService {

    controller: AbortController | null
    constructor(){
        this.controller = null;
    }

    async create(tutor: ITutorChange){
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

    async getAllByAdmin(id: number): Promise<{tutors: ITutor[], tutors_count: number}>{
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + `/tutors?admin_id=${id}`)
        const {tutors, tutors_count}: {tutors: ITutor[], tutors_count: number} = await res.json()
        return {tutors, tutors_count}
    }

    async get(id: number): Promise<ITutorData>{
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/tutors/' + id)
        const {tutor}: {tutor: ITutorData} = await res.json()
        return tutor
    }

    async getAll(): Promise<{tutors: ITutor[], tutors_count: number}> {
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/tutors')
        const {tutors, tutors_count}: {tutors: ITutor[], tutors_count: number} = await res.json()
        return {tutors, tutors_count}
    }

    async trialLesson(student_id: number){
        await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/tutors/trial_lesson', {
            method: "POST",
            body: JSON.stringify({student_id})
        })
    }

    async  conductLesson(student_id: number, duration: number, date: string){
        await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/tutors/conduct_lesson', {
            method: "POST",
            body: JSON.stringify({student_id, duration, date})
        })
    }

    async getLessons(id: number, from: string, to: string): Promise<{lessons: ILessonTutor[], lessons_count: number}>{
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/tutors/' + id + '/lessons', {
            method: "POST",
            body: JSON.stringify({from, to})
        })
        const {lessons, lessons_count}: {lessons: ILessonTutor[], lessons_count: number} = await res.json()
        return {lessons, lessons_count}
    }

    async archive(id: number): Promise<void> {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/tutors/' + id + '/archive', {
            method: "POST"
        })
    }

    async unarchive(id: number): Promise<void> {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/tutors/' + id + '/unarchive', {
            method: "POST"
        })
    }

    async getArchiveAll(): Promise<{tutors: ITutor[], tutors_count: number}> {
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/tutors/archive')
        const {tutors, tutors_count}: {tutors: ITutor[], tutors_count: number} = await res.json()
        return {tutors, tutors_count}
    }

    async getAllByFilters(tg_admins_usernames_ids: number[], is_archive?: boolean): Promise<{tutors: ITutor[], tutors_count: number}> {
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/tutors/filter', {
            method: 'POST',
            body: JSON.stringify({tg_admins_usernames_ids, is_archive})
        })
        const {tutors, tutors_count}: {tutors: ITutor[], tutors_count: number} = await res.json()
        return {tutors, tutors_count}
    }

    async update(tutor: ITutorChange): Promise<void> {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/tutors/' + tutor.id + '/update', {
            method: "POST",
            body: JSON.stringify(tutor)
        })
    }

}

export const tutorService = new TutorService()
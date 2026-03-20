import { fetchAuth } from "../../../shared/api/ApiService"
import { ILessonTutor, ITutor, ITutorAccrual, ITutorChange, ITutorData, ITutorFinance } from "../model/types";



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

    async getAllByFilters(tg_admins_usernames_ids: number[], is_failer: boolean, is_archive?: boolean): Promise<{tutors: ITutor[], tutors_count: number}> {
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/tutors/filter', {
            method: 'POST',
            body: JSON.stringify({tg_admins_usernames_ids, is_failer, is_archive})
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

    async gphGet(tutorId: number): Promise<Blob> {
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/tutors/' + tutorId + '/contract', {
            method: "GET",
            headers: {
                Accept: "application/pdf",
            },
        })
        const blob = await res.blob();
        return blob
    }

    async gphDelete(tutorId: number): Promise<void> {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/tutors/' + tutorId + '/contract', {
            method: "DELETE"
        })
    }

    async addAccrual(tutorId: number, amount: string){
        await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/tutors/' + tutorId + '/accruals', {
            method: "POST",
            body: JSON.stringify({amount})
        })
    }

    async gphAdd(formData: FormData, tutorId: number): Promise<void> {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/tutors/' + tutorId + '/contract', {
            method: "POST",
            body: formData
        }, false, true)
    }

    async getAccruals(tutorId: number){
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/tutors/' + tutorId + '/accruals')
        const {accruals}: {accruals: ITutorAccrual[]} = await res.json()
        return accruals 
    }

    async getAllReceipt(tutorId: number, from: string, to: string): Promise<Blob>{
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/tutors/' + tutorId + '/receipts', {
            method: "POST",
            body: JSON.stringify({from, to}),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/zip",
            },
        }, false, true)
        const blob = await res.blob();
        return blob  
    }

    async receiptSave(formData: FormData){
        await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/tutors/save_receipt', {
            method: "POST",
            body: formData
        }, false, false)
    }

    async receiptFailerCheck(){
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/tutors/receipt/failer_check')
        const {is_failer}: {is_failer: boolean} = await res.json();
        return is_failer
    }

    async getDownloadAllContracts() {
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/tutors/contracts/download_all', {
            method: "GET",
            headers: {
                "Accept": "application/zip",
            },
        }, false, true)
        const blob = await res.blob();
        return blob  
    }

    async getDownloadAllReceipts(from: string, to: string) {
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/tutors/receipts/download_all', {
            method: "POST",
            body: JSON.stringify({from, to}),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/zip",
            },
        }, false, true)
        const blob = await res.blob();
        return blob  
    }

}

export const tutorService = new TutorService()
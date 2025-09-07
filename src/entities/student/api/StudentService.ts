import { fetchAuth } from "../../../shared/api/ApiService"
import { IStudent } from "../model/types"



class StudentService {

    async getAll() {
        // const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/students')
        // const {students}: {students: IStudent[]} = await res.json()

        await new Promise(resolve => setTimeout(resolve, 4000))

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
                "last_name": "Нечепорук",
                "middle_name": "Алексеевич",
                "tg": "https://t.me/maxim_jordan",
                "is_only_trial_finished": true,
                "is_balance_negative": false,
                "is_newbie": false
            },
            {
                "id": 3,
                "first_name": "Максим",
                "last_name": "Нечепорук",
                "middle_name": "Алексеевич",
                "tg": "https://t.me/maxim_jordan",
                "is_only_trial_finished": true,
                "is_balance_negative": false,
                "is_newbie": false
            },
        ]
    }

}

export const studentService = new StudentService()
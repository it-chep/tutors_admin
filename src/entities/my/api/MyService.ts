import { fetchAuth } from "../../../shared/api/ApiService"
import { IMyFinance } from "../model/types"



class MyService{


    async getFinance(from: string, to: string): Promise<IMyFinance> {
        // const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/finance', {
        //     method: "POST",
        //     body: JSON.stringify({
        //         from,
        //         to
        //     })
        // })
        // const {data}: {data: IMyFinance[]} = await res.json()
        return {
            "profit": "1244",
            "cash_flow": "2132323",
            "conversion": 20,
            "lessons_count": 1000
        }
    }

}

export const myService = new MyService()
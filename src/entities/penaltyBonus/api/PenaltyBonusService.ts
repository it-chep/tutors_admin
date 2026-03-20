import { fetchAuth } from "../../../shared/api/ApiService"
import { IPenaltyBonusItem, IPenaltyBonusSummary, TPenaltyBonus } from "../model/types"

class PenaltyBonusService {

    async tutorGetPenaltiesBonuses(tutorId: number, from: string, to: string) {
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + `/tutors/${tutorId}/penalties_bonuses`, {
            method: "POST",
            body: JSON.stringify({from, to}),
        })
        const {items, summary}: {items: IPenaltyBonusItem[], summary: IPenaltyBonusSummary} = await res.json()
        return {items, summary}
    }
    
    async tutorGetPenaltiesBonusesPersonal(from: string, to: string) { 
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + `/tutors/penalties_bonuses`, {
            method: "POST",
            body: JSON.stringify({from, to}),
        })
        const {items, summary}: {items: IPenaltyBonusItem[], summary: IPenaltyBonusSummary} = await res.json()
        return {items, summary}
    }

    async tutorAddPenaltiesBonuses(tutorId: number, amount: string, comment: string, type: TPenaltyBonus) {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + `/tutors/${tutorId}/add_penalties_bonuses`, {
            method: "POST",
            body: JSON.stringify({amount, comment, type}),
        })
    }

    async assistantGetPenaltiesBonuses(assistantId: number, from: string, to: string) {
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + `/assistants/${assistantId}/penalties_bonuses`, {
            method: "POST",
            body: JSON.stringify({from, to}),
        })
        const {items, summary}: {items: IPenaltyBonusItem[], summary: IPenaltyBonusSummary} = await res.json()
        return {items, summary}
    }
    
    async assistantGetPenaltiesBonusesPersonal(from: string, to: string) { 
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + `/assistants/penalties_bonuses`, {
            method: "POST",
            body: JSON.stringify({from, to}),
        })
        const {items, summary}: {items: IPenaltyBonusItem[], summary: IPenaltyBonusSummary} = await res.json()
        return {items, summary}
    }

    async assistantAddPenaltiesBonuses(assistantId: number, amount: string, comment: string, type: TPenaltyBonus) {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + `/assistants/${assistantId}/add_penalties_bonuses`, {
            method: "POST",
            body: JSON.stringify({amount, comment, type}),
        })
    }

}

export const penaltyBonusService = new PenaltyBonusService()
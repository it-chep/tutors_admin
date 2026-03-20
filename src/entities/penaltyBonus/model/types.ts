


export type TPenaltyBonus = 'penalty' | 'bonus'

export interface IPenaltyBonusItem {
    id: number;
    type: TPenaltyBonus;
    amount: string;
    comment: string;
    created_at: string;
}

export interface IPenaltyBonusSummary {
    penalties: string;
    bonuses: string;
}
import { FC, useState } from "react";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { useMyActions } from "../../../entities/my";
import { AuthError } from "../../../shared/err/AuthError";
import classes from './assistantPenaltyBonus.module.scss'
import { OpenContainer } from "../../../features/openContainer";
import { MyError } from "../../../shared/lib/error/MyError";
import { getDateUTC } from "../../../shared/lib/helpers/getDateUTC";
import { Data } from "./data/Data";
import { IPenaltyBonusItem, IPenaltyBonusSummary, penaltyBonusService, TPenaltyBonus } from "../../../entities/penaltyBonus";
import { AddPenaltyBonus } from "../../../features/addPenaltyBonusTutor";

interface IProps {
    assistantId: number | null;
}

export const AssistantPenaltyBonus: FC<IProps> = ({assistantId}) => {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useMyActions()
    const [items, setItems] = useState<IPenaltyBonusItem[]>([])
    const [summary, setSummary] = useState<IPenaltyBonusSummary | null>(null)

    const getData = async (from: string, to: string) => {
        try{
            setIsLoading(true)
            if(assistantId){
                const {summary, items} = await penaltyBonusService.assistantGetPenaltiesBonuses(assistantId, from, to)
                setSummary(summary)
                setItems(items)
            }
            else{
                const {summary, items} = await penaltyBonusService.assistantGetPenaltiesBonusesPersonal(from, to)
                setSummary(summary)
                setItems(items)
            }
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else if(e instanceof MyError && (e.status === 404)){}
            else{
                setGlobalMessage({message: 'Ошибка при получении списка премий и штрафов', type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    const setDate = (startDate: Date | null, endDate: Date | null) => {
        if(startDate && endDate){
            getData(getDateUTC(startDate), getDateUTC(endDate))
        }
    }

    const addReq = (amount: string, comment: string, type: TPenaltyBonus) => {
        return penaltyBonusService.assistantAddPenaltiesBonuses(assistantId || -1, amount, comment, type)
    }

    return (
        <section className={classes.container}>
            {
                assistantId
                    ?
                <OpenContainer title="Штрафы и премии">
                    <section className={classes.content}>
                        <AddPenaltyBonus 
                            request={addReq} 
                        />
                        <span className={classes.hr} />
                        <Data 
                            setDate={setDate}
                            summary={summary}
                            items={items}
                            isLoading={isLoading}
                        />
                    </section>
                </OpenContainer>
                    :
                <section className={classes.widget}>
                    <section className={classes.sign}>
                        Выплаты и штрафы
                    </section>
                    <Data 
                        setDate={setDate}
                        summary={summary}
                        items={items}
                        isLoading={isLoading}
                    />
                </section>
            }
        </section>
    )
}
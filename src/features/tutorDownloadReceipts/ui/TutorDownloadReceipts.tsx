import { FC, useEffect } from "react";
import classes from './tutorDownloadReceipts.module.scss'
import { useGlobalLoadingActions } from "../../../entities/globalLoading";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { tutorService } from "../../../entities/tutor";
import { AuthError } from "../../../shared/err/AuthError";
import { useMyActions } from "../../../entities/my";
import { Calendar } from "../../../shared/ui/calendar";
import { getDateUTC } from "../../../shared/lib/helpers/getDateUTC";

interface IProps {
    tutorId: number;
}

export const TutorDownloadReceipts: FC<IProps> = ({tutorId}) => {

    const {setIsLoading} = useGlobalLoadingActions()
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useMyActions()

    const download = (zip: Blob) => {
        const a = document.createElement('a')
        const url = URL.createObjectURL(zip);
        a.href = url;
        a.download = "receipts.zip";
        document.body.appendChild(a);
        a.click();
        a.remove();
    }

    const getReceipts = async (from: string, to: string) => {
        try{
            setIsLoading(true)
            const receiptsRes = await tutorService.getAllReceipt(tutorId, from, to)
            download(receiptsRes)
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: 'Ошибка при получении архива чеков репетитора', type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }
    
    const setDate = (startDate: Date | null, endDate: Date | null) => {
        if(startDate && endDate){
            getReceipts(getDateUTC(startDate), getDateUTC(endDate))
        }
    }

    return (
        <section className={classes.container}>
            <section className={classes.sign}>
                Скачать все чеки за промежуток (ZIP-архив)
            </section>
            <Calendar onDateRangeSelect={setDate} /> 
        </section>
    )
}
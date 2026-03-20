import { FC } from "react";
import classes from './downloadAllTutors.module.scss'
import { AuthError } from "../../../shared/err/AuthError";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { useMyActions } from "../../../entities/my";
import { tutorService } from "../../../entities/tutor";
import { useGlobalLoadingActions } from "../../../entities/globalLoading";
import zipImg from '../../../shared/lib/assets/zip.png'
import { Calendar } from "../../../shared/ui/calendar";
import { getDateUTC } from "../../../shared/lib/helpers/getDateUTC";


export const DownloadAllTutorsReceipts: FC = () => {

    const {setIsLoading} = useGlobalLoadingActions()
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useMyActions()

    const download = (blob: Blob) => {
        const a = document.createElement('a')
        const url = URL.createObjectURL(blob)
        a.href = url;
        a.download = 'receipts.zip'
        document.body.appendChild(a)
        a.click()
        a.remove()
    }

    const downloadReq = async (from: string, to: string) => {
        try{
            setIsLoading(true)
            const blobRes = await tutorService.getDownloadAllReceipts(from, to)
            download(blobRes)
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: 'Ошибка при получении архива чеков репетиторов', type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
        }  
    }

    const setDate = (startDate: Date | null, endDate: Date | null) => {
        if(startDate && endDate){
            downloadReq(getDateUTC(startDate), getDateUTC(endDate))
        }
    }

    return (
        <section className={classes.container}>
            <section className={classes.sign}>
                <span>Скачать все чеки (ZIP-архив)</span>
                <img src={zipImg} alt="zip" />
            </section>
            <Calendar onDateRangeSelect={setDate} /> 
        </section>
    )
}
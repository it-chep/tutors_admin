import { FC } from "react";
import classes from './downloadAllTutors.module.scss'
import { AuthError } from "../../../shared/err/AuthError";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { useMyActions } from "../../../entities/my";
import zipImg from '../../../shared/lib/assets/zip.png'
import { tutorService } from "../../../entities/tutor";
import { useGlobalLoadingActions } from "../../../entities/globalLoading";


export const DownloadAllTutorsContracts: FC = () => {

    const {setIsLoading} = useGlobalLoadingActions()
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useMyActions()

    const download = (blob: Blob) => {
        const a = document.createElement('a')
        const url = URL.createObjectURL(blob)
        a.href = url;
        a.download = 'contracts.zip'
        document.body.appendChild(a)
        a.click()
        a.remove()
    }

    const downloadReq = async () => {
        try{
            setIsLoading(true)
            const blobRes = await tutorService.getDownloadAllContracts()
            download(blobRes)
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: 'Ошибка при получении архива договоров репетиторов', type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
        }  
    }


    return (
        <section onClick={downloadReq} className={classes.container}>
            <span>Скачать все договоры (ZIP-архив)</span>
            <img src={zipImg} alt="zip" />
        </section>
    )
}
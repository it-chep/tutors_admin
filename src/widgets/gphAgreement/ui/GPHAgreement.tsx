import { ChangeEvent, FC, useEffect, useState } from "react";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { useMyActions } from "../../../entities/my";
import { useAppSelector } from "../../../app/store/store";
import { Contract, tutorService } from "../../../entities/tutor";
import { AuthError } from "../../../shared/err/AuthError";
import classes from './gphAgreement.module.scss'
import { OpenContainer } from "../../../features/openContainer";
import { LoaderSpinner } from "../../../shared/ui/spinner";
import { DeleteAction } from "../../../features/deleteAction";
import { useGlobalLoadingActions } from "../../../entities/globalLoading";
import { MyError } from "../../../shared/lib/error/MyError";

interface IProps {
    tutorId: number;
}

export const GPHAgreement: FC<IProps> = ({tutorId}) => {

    const [contractBlob, setContractBlob] = useState<Blob | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsLoading: setIsLoadingGlobal} = useGlobalLoadingActions()
    const {setIsAuth} = useMyActions()
    const {my} = useAppSelector(s => s.myReducer)

    const getContract = async () => {
        try{
            setIsLoading(true)
            const gphRes = await tutorService.gphGet(tutorId)
            setContractBlob(gphRes)
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else if(e instanceof MyError && (e.status === 404)){}
            else{
                setGlobalMessage({message: 'Ошибка при получении файла', type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    const [trigger, setTrigger] = useState<number>(0)
    useEffect(() => {
        getContract()
    }, [trigger])

    const onDelete = async () => {
        await tutorService.gphDelete(tutorId)
        setContractBlob(null)
    }

    const onSend = async (formData: FormData) => {
        try{
            setIsLoadingGlobal(true)
            await tutorService.gphAdd(formData, tutorId)
            setGlobalMessage({message: 'Успешное добавление файла договора', type: 'ok'})
            setTrigger(trigger + 1)
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: 'Ошибка при добавлении файла', type: 'error'})
            }
        }
        finally{
            setIsLoadingGlobal(false)
        }
    }

    const onAddFile = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if(files){
            const file = files[0]
            if(file){
                const formData = new FormData()
                formData.append('gph', file, file.name)
                onSend(formData)
            }
        }
    }

    return (
        <section className={classes.container}>
            <OpenContainer title="Договор">
                <section className={classes.content}>
                    {
                        isLoading
                            ?
                        <section className={classes.loader}><LoaderSpinner /></section>
                            :
                        contractBlob
                            ?
                        <>
                            <Contract
                                contractBlob={contractBlob}
                            >
                                <DeleteAction 
                                    questionText="Вы точно хотите удалить договор"
                                    successText="Успешное удаление договора"
                                    errorText="Ошибка удаления договора"
                                    onDelete={onDelete}
                                />
                            </Contract>
                        </>
                            :
                        <>
                            <label className={classes.add}>
                                <input 
                                    className={classes.input} 
                                    onChange={onAddFile} 
                                    type="file" 
                                    accept=".pdf" 
                                />
                                + Добавить договор
                            </label>
                        </>
                    }
                </section>
            </OpenContainer>
        </section>
    )
}
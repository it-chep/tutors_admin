import { FC, useEffect, useState } from "react";
import classes from './tutorsWidget.module.scss'
import { MyButton } from "../../../shared/ui/button";
import { LoaderSpinner } from "../../../shared/ui/spinner";
import { AuthError } from "../../../shared/lib/helpers/AuthError";
import { useMyActions } from "../../../entities/my";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { useNavigate } from "react-router-dom";
import { STUDENT_CREATE_ROUTE, TUTOR_CREATE_ROUTE } from "../../../app/router/routes";
import { SearchItems } from "../../../features/searchItems/ui/SearchItems";
import { ITutor, TutorItem, tutorService } from "../../../entities/tutor";


export const TutorsWidget: FC = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true)

    const [tutors, setTutors] = useState<ITutor[]>([])
    const [tutorsSearch, setTutorsSearch] = useState<ITutor[]>([])

    const router = useNavigate()

    const {setIsAuth} = useMyActions()
    const {setGlobalMessage} = useGlobalMessageActions()

    const getData = async () => {
        try{
            setIsLoading(true)
            const tutorsRes = await tutorService.getAll()
            setTutors(tutorsRes)
            setTutorsSearch(tutorsRes)
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: 'Ошибка при получении списка репетиторов', type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [])


    return (
        <section className={classes.container}>
            <section className={classes.addTutorWrap}>
                <section className={classes.button}> 
                    <MyButton onClick={() => router(TUTOR_CREATE_ROUTE.path)}>
                        Добавить репетитора
                    </MyButton>
                </section>
            </section>
            <section className={classes.searchItems}>
                <SearchItems 
                    placeholder="Введите фио репетитора"
                    items={tutors.map(
                        tutor => ({...tutor, name: tutor.full_name})
                    )}
                    setItems={setTutorsSearch}
                />
            </section>
            {
                isLoading
                    ?
                <section className="loader"><LoaderSpinner /></section>
                    :
                <table className={classes.table}>
                    <thead>
                        <tr className={classes.item}>
                            <th>ID</th>
                            <th>Фио</th>
                            <th>Телеграм</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tutorsSearch.map(tutor => 
                            <TutorItem 
                                key={tutor.id}
                                tutor={tutor}
                            >
                                <MyButton onClick={() => router('/tutor/' + tutor.id)}>
                                    Подробнее
                                </MyButton>
                            </TutorItem>
                        )}
                    </tbody>
                </table>
            }
        </section>
    )
}